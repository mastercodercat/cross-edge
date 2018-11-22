export const businessProcesses = [
  {
    "name":"File Writer",
    "description":"",
    "rule":2,
    "subscriber":2,
    "site_location":2,
    "sub_site_location":null,
    "partner":3,
    "image":"https://adept-static-files.s3.amazonaws.com/media/private/bps/carry-package.eps?AWSAccessKeyId=AKIAJ6WNAUENWAMT3O2Q&Signature=Lhdlf5zQroWB%2FXA%2B%2BtF0n4nJuqI%3D&Expires=1540463277",
    "mdm_type":"business_process",
  },
  {
    "name":"Commissioning",
    "description":"A business process to create an EPCIS Document containing a single Commissioning ObjectEvent",
    "rule":3,
    "subscriber":2,
    "site_location":2,
    "sub_site_location":1,
    "partner":3,
    "image":"https://adept-static-files.s3.amazonaws.com/media/private/bps/commissioning.png?AWSAccessKeyId=AKIAJ6WNAUENWAMT3O2Q&Signature=hbW3fS0uSa3TOYkOSIm6wDBnpFE%3D&Expires=1540463277",
    "mdm_type":"business_process",
  },
  {
    "name":"Aggregation",
    "description":"The Aggregation Business Process creates an EPCIS Document with a Commissioning ObjectEvent and an Aggregation Event.",
    "rule":4,
    "subscriber":2,
    "site_location":2,
    "sub_site_location":1,
    "partner":3,
    "image":"https://adept-static-files.s3.amazonaws.com/media/private/bps/aggregation.png?AWSAccessKeyId=AKIAJ6WNAUENWAMT3O2Q&Signature=2UTIPAgUyORaTw1PIgjw%2FZ2upfU%3D&Expires=1540463277",
    "mdm_type":"business_process",
  }
]

export const businessProcessWizardData = {
  name: 'Gibson Aggregation',
  process_name: 'Aggregation',
  markup: {
    steps: [
      [
        { label: 'Scan or Enter Identifiers', control: 'scan-multiple', name: 'data', type: 'array' },
        { label: 'Select Item Level', control: 'select', name: 'pack_level', type: 'string', data: ['Level 1', 'Level 2'] },
      ],
      [
        { label: 'Scan or Enter Parent Identifier', control: 'scan-single', name: 'parent', type: 'string' },
      ],
      [
        { control: 'verify-submit' },
      ],
    ]
  }
}

export const nonExistingBusinessProcesses = {
  "name":"Nonexisting BP",
  "description":"",
  "rule":2,
  "subscriber":2,
  "site_location":2,
  "sub_site_location":null,
  "partner":3,
  "image":"https://adept-static-files.s3.amazonaws.com/media/private/bps/carry-package.eps?AWSAccessKeyId=AKIAJ6WNAUENWAMT3O2Q&Signature=Lhdlf5zQroWB%2FXA%2B%2BtF0n4nJuqI%3D&Expires=1540463277",
  "mdm_type":"business_process"
}

export const homeContent = [
  {
    "id":1,
    "name":"Avery Dennison",
    "description":null,
    "gln":"0686781000004",
    "image":"https://adept-static-files.s3.amazonaws.com/media/private/clients/AD-Logo-250x45.png?AWSAccessKeyId=AKIAJ6WNAUENWAMT3O2Q&Signature=1LVM9qG9%2By6EpvFGMMEdpurCG3s%3D&Expires=1540463964",
    "time_zone_offset":0,
    "has_business_processes":false,
    "mdm_type":"subscriber"
  },
  {
    "id":5,
    "name":"Adept",
    "description":null,
    "gln":"",
    "image":null,
    "time_zone_offset":-5,
    "has_partners":true,
    "has_sites":false,
    "has_subsites":false,
    "has_business_processes":true,
    "mdm_type":"subscriber"
  },
  {
    "id":2,
    "name":"Guitar House",
    "description":null,
    "gln":"0805555127437",
    "image":"https://adept-static-files.s3.amazonaws.com/media/private/clients/image_JnPNjL1.gif?AWSAccessKeyId=AKIAJ6WNAUENWAMT3O2Q&Signature=ZRtwmtxYbZLPw8RBJ1XRFXTvm%2B4%3D&Expires=1540463965",
    "time_zone_offset":0,
    "has_partners":true,
    "has_sites":false,
    "has_subsites":false,
    "has_business_processes":false,
    "mdm_type":"subscriber"
  }
]

export const sites = [
  {
    "id":3,
    "name":"Guitar House Site 2",
    "description":"",
    "address_1":"451 Not a Street",
    "address_2":null,
    "city":"Philadelphia",
    "state":"PA",
    "country":"US",
    "postal_code":"19145",
    "image":null,
    "gln":"1234567890120",
    "time_zone_offset":0,
    "has_business_processes":false,
    "has_sub_sites":false,
    "mdm_type":"site"
  },
  {
    "id":2,
    "name":"Guitar House Site 1",
    "description":"",
    "address_1":"123 Fake Street",
    "address_2":null,
    "city":"Anytown",
    "state":"PA",
    "country":"US",
    "postal_code":"19145",
    "image":null,
    "gln":"1234567890123",
    "time_zone_offset":0,
    "has_business_processes":true,
    "has_sub_sites":true,
    "mdm_type":"site"
  }
]
