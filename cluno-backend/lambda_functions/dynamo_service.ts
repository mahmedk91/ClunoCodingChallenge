import offers from "./offers.json";

export default class DynamoDBService {
  // Fetches all visible offers from DynamoDB
  public static getAllVisibleOffers(): Array<any> {
    return this.simplifyOffers(offers)
      .filter(offer => offer.visible)
      .sort((a, b) => {
        if (a.pricing.price > b.pricing.price) {
          return 1;
        }

        if (a.pricing.price < b.pricing.price) {
          return -1;
        }

        return 0;
      });
  }

  // Fetches offer with id from DynamoDB
  public static getOffer(id: String): any {
    return this.simplifyOffers(offers).find(offer => offer.id === id);
  }

  // Simplifies the offer data from AWS Dynamo DB low level json format to normal json format
  protected static simplifyOffers(offers: any): any {
    let simplifiedOffers = Array();

    // Parse complicated attributes. Example - items in offers.json
    offers.Items.forEach(item => {
      let parsedItem: any = {};
      for (let attribute in item) {
        parsedItem[attribute] = this.parseAttribute(item[attribute]);
      }
      simplifiedOffers.push(parsedItem);
    });

    return simplifiedOffers;
  }

  // Parses the attribute from S, N, M, L to string, number, object or list type
  protected static parseAttribute(attribute: any): any {
    if (!attribute) {
      return;
    }
    let keys: Array<string> = Object.keys(attribute);
    if (keys) {
      let key = keys[0]; // Get the first key of attribute and determine the type
      switch (key) {
        case "M":
          // Parse object if type is M and recursively parse all keys of the object
          let parsedObject: any = {};
          for (let objectKey in attribute[key]) {
            parsedObject[objectKey] = this.parseAttribute(
              attribute[key][objectKey]
            );
          }
          return parsedObject;
        case "L":
          // Parse list if type is L and iteratively parse all elements of the list
          let parsedList: Array<any> = [];
          attribute[key].forEach(element => {
            element = this.parseAttribute(element);
            parsedList.push(element);
          });
          return parsedList;
        case "S":
          // Parse string if type is S
          return String(attribute[key]);
        case "N":
          // Parse number if type is N
          return Number(attribute[key]);
        case "BOOL":
          // Parse boolean if type is BOOL
          return Boolean(attribute[key]);
      }
    }
    return;
  }
}
