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