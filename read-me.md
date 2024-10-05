docker build -t jazke .
docker run -p 49160:3000 -d jazke
docker-compose up --build



{
  "kyc": {
    "fname": "John Doe",
    "name": "John Doe",
    "phone": "708374149",
    "email": "ahabweemma@gmail.com",
    "tin": "A123456789B",
    "city": "Nairobi",
    "address": "Port bell road"
  },
  "vehicle": {
    "kycType": "individual",
    "pTin": "A123456789B",
    "nin": "12345678",
    "pfname": "John Doe",
    "pfnameMasked": "Jo****oe",
    "gender": "Male",
    "pphone": "708374149",
    "pemail": "ahabweemma@gmail.com",
    "pCity": "Nairobi",
    "pAddress": "Port bell road",
    "dob": "2024-09-30",
    "bodyType": "TRI CLYCLE",
    "EngineNumber": "252424",
    "chasisNumber": "2526",
    "tonnage": 30,
    "anyBankOrMFIInterested": "yes",
    "IsBankOrMFIinterested": true,
    "valuer": "SOLVIT LIMITED",
    "hasDoubleInsurance": false,
    "registrationNumber": "KAC040R",
    "bankOrMFI": "Development Bank of Kenya Limited"
  },
  "companyDivision": "113",
  "coverStartDate": "2024-09-30",
  "coverEndDate": "2025-09-29"
}

{
  "serialNumber": "",
  "motorId": "772dc1b8-a60a-488b-b7d9-a006bb3c0e53",
  "vehicleRegNumber": "KAC040R",
  "motorClass": "commercial",
  "motorSubclass": "General Cartage",
  "makeModel": "MotorCommercialGeneralCartage",
  "vehicleMake": "AUSTIN",
  "vehicleModel": "ROVER",
  "numberPlate": "",
  "referToHQ": "No",
  "yearOfManufacture": "2009",
  "vehicleAge": 15,
  "sumInsured": 1600000,
  "basicPremium": 100000,
  "pvtBenefit": 0,
  "pvtInterest": "no",
  "excessProtectorBenefit": 8000,
  "excessProtectorInterest": "yes",
  "courtesyCarBenefit": 0,
  "courtesyCarInterest": "",
  "aaRoadRescueBenefit": 0,
  "aaRoadRescueInterest": "",
  "windScreenBenefit": 0,
  "windScreenExtraBenefit": 0,
  "radioCassetteBenefit": 0,
  "radioCassetteExtraBenefit": 0,
  "passengerLegalLiabilityBenefit": 1000,
  "vehicleDisabled": false,
  "netPremium": 109000,
  "levies": 490,
  "stampDuty": 40,
  "grossPremium": 109530
}



Intermediary Registration email
intermediary.administration@allianz.com.



name: Trigger auto deployment for jazk-web-ca

# When this action will be executed
on:
  # Automatically trigger it when detected changes in repo
  push:
    branches: 
      [ dev ]
    paths:
    - '**'
    - '.github/workflows/jazk-web-ca-AutoDeployTrigger-c419ba83-9417-4b2b-a91b-9d026f91dbda.yml'

  # Allow manual trigger 
  workflow_dispatch:
      
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout to the branch
        uses: actions/checkout@v2

      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.JAZKWEBCA_AZURE_CREDENTIALS }}

      - name: Build and push container image to registry
        uses: azure/container-apps-deploy-action@v2
        with:
          # appSourcePath: ${{ github.workspace }}Dockerfile
          appSourcePath: ${{ github.workspace }}
          # _dockerfilePathKey_: _dockerfilePath_
          registryUrl: jazkapiregistry.azurecr.io
          registryUsername: ${{ secrets.JAZKWEBCA_REGISTRY_USERNAME }}
          registryPassword: ${{ secrets.JAZKWEBCA_REGISTRY_PASSWORD }}
          containerAppName: jazk-web-ca
          resourceGroup: jazk-api-rg
          containerAppEnvironment: jazk-api-env2
          ingress: external
          targetPort: 3100
          dockerfilePath: Dockerfile
          # imageToBuild: jazkapiregistry.azurecr.io/jazk-web-ca:${{ github.sha }}
          imageToBuild: jazkapiregistry.azurecr.io/jazx-web-ca:newest
          
            

     

