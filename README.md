# seshutils-tesco-service #

A [serverless](https://serverless.com/ "serverless") node application. Configured to run on [aws Lambda](https://aws.amazon.com/lambda/ "aws Lambda Service")

## GETTING STARTED ##
* Clone the repo
```
git clone https://github.com/shanenolanwit/seshutils-tesco-service.git
```
* Install serverless
```
npm install serverless -g
```
* Install and configure the [aws cli](https://aws.amazon.com/cli/ "aws command line interface").
* Ensure you have installed the [serverless](https://serverless.com/ "serverless") toolkit and follow the [guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/ "aws - serverless") to hooking up your aws account.
* Register for a [Tesco](https://devportal.tescolabs.com/ "tesco devportal") developer account (this application may take some time).
* Add the following keys to your [aws Systems Manager](https://aws.amazon.com/systems-manager/ "AWS Systems Manager") parameter store 
    * testToken (any value - used for testing ssm is configured)
    * tescoPrimary (obtained from tesco developer portal)
    * tescoSecondary (obtained from tesco developer portal)  



```
aws ssm put-parameter --name testToken --type String --value TEST-VALUE

aws ssm put-parameter --name tescoPrimary --type String --value API-KEY

aws ssm put-parameter --name tescoSecondary --type String --value API-KEY
```

Deploy your application to the cloud
```
serverless deploy
```

You should now see your lambdas listed in your [aws console](https://aws.amazon.com/console/ "aws console") under **Services>Lambda**

## API ##
---
GET `dev/alcohols?limit=[limit]&&offset=[offset]`  
Gets tesco alcohol listings using the specified limit and offset filters
### Request ###
```
https://YOUR-LAMBDA-URL/dev/alcohols?limit=1&&offset=2
```
### Response ###
```
{
    {  
    "message":"Listing products",
    "products":[  
      {  
         "image":"http://img.tesco.com/Groceries/pi/368/5054268979368/IDShot_90x90.jpg",
         "superDepartment":"Drinks",
         "tpnb":77535649,
         "ContentsMeasureType":"ML",
         "name":"Tesco Vodka And Lime And Low Calorie Lemonade 250Ml",
         "UnitOfSale":1,
         "AverageSellingUnitWeight":0.273,
         "description":[  
            "A blend of carbonated low calorie lemonade made with lemon juice from concentrate and sweeteners, grain vodka and lime juice from concentrate.",
            "Pour over fresh ice cubes in a tall glass and garnish with a fresh lemon wedge and serve"
         ],
         "UnitQuantity":"LITRE",
         "id":285348360,
         "ContentsQuantity":250,
         "department":"Spirits",
         "price":1,
         "unitprice":4
      },
      {  
         "image":"http://img.tesco.com/Groceries/pi/971/5410316991971/IDShot_90x90.jpg",
         "superDepartment":"Drinks",
         "tpnb":56950419,
         "ContentsMeasureType":"ML",
         "name":"Smirnoff Ice 70Cl",
         "UnitOfSale":1,
         "AverageSellingUnitWeight":1.213,
         "description":[  
            "Smirnoff Ice - A Vodka mixed drink with the classic taste of lemon."
         ],
         "UnitQuantity":"LITRE",
         "id":255404798,
         "ContentsQuantity":700,
         "department":"Spirits",
         "price":3,
         "unitprice":4.29
      }
   ]
   }
}
```
---
GET `dev/alcohol/[:id]`  
Gets detail of a specific alcohol product
### Request ###
```
https://YOUR-LAMBDA-URL/dev/alcohol/255404798
```
### Response ###
```
{  
   "message":"Product data",
   "product":{  
      "gtin":"05410316986557",
      "tpnb":"056950419",
      "tpnc":"255404798",
      "description":"Smirnoff Ice 70Cl",
      "brand":"SMIRNOFF",
      "qtyContents":{  
         "quantity":700,
         "totalQuantity":700,
         "quantityUom":"ml",
         "netContents":"70cl ℮",
         "avgMeasure":"Average Measure (e)"
      },
      "productCharacteristics":{  
         "isFood":false,
         "isDrink":true,
         "isHazardous":false,
         "storageType":"Ambient",
         "isAnalgesic":false,
         "containsLoperamide":false
      },
      "pkgDimensions":[  
         {  
            "no":1,
            "height":28.4,
            "width":7.5,
            "depth":7.8,
            "dimensionUom":"cm",
            "weight":1175,
            "weightUom":"g",
            "volume":1661.4,
            "volumeUom":"cc"
         }
      ]
   }
   
}
```