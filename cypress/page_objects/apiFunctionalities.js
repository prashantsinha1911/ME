const utilObj = require("../utils/util_generic");
const apiData = require("../fixtures/apiData.json");
// get baseURl in `protocol + "//" + hostname` format
const baseUrl = utilObj.getCustomUrl(Cypress.env("host"));

class apiFunctionalities {
  getAccessToken(username, password) {
    const tokenPayLoadObj = apiData.token.payload;
    tokenPayLoadObj.username = username;
    tokenPayLoadObj.password = password;
    const credentials = `${tokenPayLoadObj.client_id}:${tokenPayLoadObj.client_secret}`;
    const authorization = `Basic ${Buffer.from(credentials).toString(
      "base64"
    )}`;
    cy.request({
      method: "POST",
      url: `${baseUrl}/oauth/token`,
      headers: {
        Authorization: authorization
      },
      // supports FormData Object only
      body: utilObj.getFormDataObj(tokenPayLoadObj)
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseData = JSON.parse(
        Cypress.Blob.arrayBufferToBinaryString(response.body)
      );
      let access_token = responseData.access_token;
      cy.wrap(access_token).as(`access_token_${username}`);
    });
  }

  getAWSApiFormData(policyResponseBody, imageBlob) {
    const { accessKey, signature, policy, startsWith } = policyResponseBody;
    const formData = new FormData();
    formData.append("key", startsWith);
    formData.append("AWSAccessKeyId", accessKey);
    formData.append("acl", "private");
    formData.append("success_action_status", "201");
    formData.append("policy", policy);
    formData.append("signature", signature);
    // Content type needs to be added before file
    formData.append("Content-Type", imageBlob.type);
    formData.append("file", imageBlob);
    return formData;
  }

  getAttachmentObject(xml, imageBlob, signedUrl, fileName) {
    let attachment = {
      key: xml.querySelector("Key")?.innerHTML,
      location: xml.querySelector("Location")?.innerHTML,
      bucket: xml.querySelector("Bucket")?.innerHTML,
      etag: xml.querySelector("ETag")?.innerHTML,
      // bytes in the file
      size: imageBlob.size,
      // mime type
      mimeType: imageBlob.type,
      // The policy API will have given back a pre-signed URL for given file destination
      imageSrc: signedUrl,
      name: fileName
    };
    return attachment;
  }

  createOrder(access_token, orderData, orderStatus, fileName) {
    // policy api
    let imageBlob;
    cy.request({
      method: "GET",
      url: `${baseUrl}/api/photo/policy?filename=${fileName}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then((policyResponse) => {
      expect(policyResponse.status).to.eq(200);
      // get image file from fixture in blob format
      cy.fixture(fileName).then((base64String) => {
        // Change the MIME type according to the image type
        imageBlob = Cypress.Blob.base64StringToBlob(base64String, "image/jpeg");
        // signedUrl is used to get attachment
        const { bucket, signedUrl } = policyResponse.body;
        // get aws api url
        const awsURL = `https://${bucket}.s3.amazonaws.com/`;
        // get aws api url body in formData format
        const awsFormData = this.getAWSApiFormData(
          policyResponse.body,
          imageBlob
        );
        cy.request({
          method: "POST",
          url: awsURL,
          body: awsFormData
        }).then((awsResponse) => {
          expect(awsResponse.status).to.eq(201);
          // array buffer -> binary string -> xml
          let data = Cypress.Blob.arrayBufferToBinaryString(awsResponse.body);
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, "application/xml");
          const attachment = this.getAttachmentObject(
            xml,
            imageBlob,
            signedUrl,
            fileName
          );
          // create order
          cy.request({
            method: "POST",
            url: `${baseUrl}/api/orders`,
            headers: {
              Authorization: `Bearer ${access_token}`
            },
            body: {
              ...orderData,
              status: orderStatus
            }
          }).then((response) => {
            expect(response.status).to.eq(201);
            // wrap orderlocation to get orderId and update the order
            cy.wrap(response.headers.location).as("orderLocation");
            cy.request({
              method: "POST",
              url: `${baseUrl}${response.headers.location}/attachment`,
              headers: {
                Authorization: `Bearer ${access_token}`
              },
              body: attachment
            }).then((response) => {
              expect(response.status).to.eq(201);
            });
          });
        });
      });
    });
  }

  updateOrder(access_token, orderLocation, updatedOrderData) {
    // get order id
    cy.request({
      method: "GET",
      url: `${baseUrl}${orderLocation}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.request({
        method: "PUT",
        url: `${baseUrl}/api/orders`,
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        body: {
          ...response.body,
          ...updatedOrderData
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  }

  deleteOrder(access_token, orderLocation) {
    cy.request({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      url: `${baseUrl}${orderLocation}`
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }

  cleanseReconciliationReport(access_token, unitId) {
    cy.request({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        restaurantUnitId: unitId
      },
      url: `${baseUrl}/api/orderReconciliationSummaries/unit/${unitId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }
}

module.exports = new apiFunctionalities();
