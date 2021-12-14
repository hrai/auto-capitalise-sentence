const commonAbbreviations = [
  'AA',
  'AAA',
  'AFR',
  'AFAIK',
  'AMD',
  'AOL',
  'APM',
  'ATM',
  'AWS',
  'BAU',
  'BBB',
  'BBQ',
  'BMW',
  'BP',
  'BRB',
  'BSD',
  'BTW',
  'CRE',
  'CMS',
  'DIY',
  'ELT',
  'ETA',
  'EU',
  'FAQ',
  'FDR',
  'FNMA',
  'FSF',
  'FTW',
  'FYI',
  'GE',
  'GNU',
  'GP',
  'GTE',
  'GTG',
  'HBO',
  'HSBC',
  'HTML',
  'IBM',
  'ICYMI',
  'ID',
  'IDs',
  'IDK',
  'IKEA',
  'IMO',
  'IOW',
  'ISO',
  'ITT',
  'JFK',
  'KFC',
  'LGTM',
  'LOL',
  'MCI',
  'MGM',
  'MIT',
  'MMW',
  'MSDN',
  'NASCAR',
  'NORAD',
  'NP',
  'NSA',
  'NVIDIA',
  'OKR',
  'OMFG',
  'OMG',
  'OTOH',
  'POI',
  'POV',
  'PS',
  'RCA',
  'ROTFL',
  'RSI',
  'RSVP',
  'SARS',
  'SLR',
  'SEO',
  'SME',
  'SMH',
  'TBA',
  'TBC',
  'TBH',
  'TC',
  'TGIF',
  'TIA',
  'TTYL',
  'TWA',
  'UBS',
  'UCLA',
  'USB',
  'WFH',
  'WIP',
  'WSL',
  'WTF',
  'WTH',
];

const commonTechAbbreviations = [
  '.NET',
  '2FA',
  'ADFS',
  'AES',
  'AI',
  'API',
  'APIs',
  'CD',
  'CDN',
  'CI',
  'CIDR',
  'CLI',
  'CORS',
  'CPU',
  'CSS',
  'DB',
  'DDoS',
  'DI',
  'DMS',
  'DNS',
  'DaaS',
  'DoS',
  'E2E',
  'EHS',
  'EHW',
  'EMP',
  'ES',
  'FIFO',
  'FaaS',
  'GQL',
  'gRPC',
  'HD',
  'HPC',
  'HTTP',
  'HTTPS',
  'HVM',
  'ICMP',
  'IOPS',
  'IP',
  'IPs',
  'IPSec',
  'IaaS',
  'JS',
  'JSON',
  'LB',
  'LTS',
  'MFA',
  'MITM',
  'ML',
  'MPLS',
  'MPP',
  'MSTSC',
  'MVC',
  'NAT',
  'NFS',
  'NS',
  'OLAP',
  'OLTP',
  'PCI',
  'PD',
  'PHP',
  'PR',
  'PRs',
  'PV',
  'PaaS',
  'Qs',
  'QA',
  'QAs',
  'RRS',
  'SAML',
  'SDK',
  'SLA',
  'SMS',
  'SOA',
  'SQL',
  'SSE',
  'SSMS',
  'SSR',
  'SSH',
  'SSL',
  'SSO',
  'SUSE',
  'SVN',
  'SaaS',
  'TCP',
  'TLS',
  'TPM',
  'TPS',
  'TS',
  'TTL',
  'UA',
  'UAT',
  'UI',
  'UIs',
  'URL',
  'URLs',
  'VDI',
  'VLAN',
  'VM',
  'VPN',
  'VTL',
  'VoIP',
  'WAF',
  'WiFi',
  'iSCSI',
];

const timeAbbreviations = [
  'ACDT',
  'ACST',
  'ACWST',
  'ADT',
  'AEDT',
  'AEST',
  'AET',
  'AFT',
  'AKDT',
  'AKST',
  'ALMT',
  'AMST',
  'AMT',
  'ANAT',
  'AQTT',
  'AST',
  'AWST',
  'AZOST',
  'AZOT',
  'AZT',
  'BNT',
  'BIOT',
  'BRST',
  'BRT',
  'BST',
  'BTT',
  'CCT',
  'CDT',
  'CEST',
  'CET',
  'CHADT',
  'CHAST',
  'CHOT',
  'CHOST',
  'CHST',
  'CHUT',
  'CIST',
  'WITA',
  'CKT',
  'CLST',
  'CLT',
  'CST',
  'CT',
  'CVT',
  'CWST',
  'CXT',
  'DAVT',
  'DDUT',
  'DFT',
  'EASST',
  'ECT',
  'EDT',
  'EEST',
  'EET',
  'EGST',
  'EGT',
  'EST',
  'FET',
  'FJT',
  'FKST',
  'FKT',
  'FNT',
  'GALT',
  'GAMT',
  'GFT',
  'GILT',
  'GMT',
  'GYT',
  'HDT',
  'HAEC',
  'HST',
  'HKT',
  'HMT',
  'HOVST',
  'HOVT',
  'ICT',
  'IDLW',
  'IDT',
  'IOT',
  'IRDT',
  'IRKT',
  'IRST',
  'IST',
  'JST',
  'KALT',
  'KGT',
  'KOST',
  'KRAT',
  'KST',
  'LHST',
  'MAGT',
  'MART',
  'MAWT',
  'MDT',
  'MHT',
  'MIT',
  'MMT',
  'MSK',
  'MST',
  'MST',
  'MUT',
  'MVT',
  'MYT',
  'NCT',
  'NDT',
  'NFT',
  'NOVT',
  'NPT',
  'NST',
  'NT',
  'NUT',
  'NZDT',
  'NZST',
  'OMST',
  'ORAT',
  'PDT',
  'PETT',
  'PGT',
  'PHOT',
  'PHT',
  'PKT',
  'PMDT',
  'PMST',
  'PONT',
  'PST',
  'PST',
  'PWT',
  'PYST',
  'PYT',
  'RET',
  'ROTT',
  'SAKT',
  'SAMT',
  'SAST',
  'SBT',
  'SCT',
  'SDT',
  'SGT',
  'SLST',
  'SRET',
  'SRT',
  'SST',
  'SST',
  'SYOT',
  'TAHT',
  'TFT',
  'TJT',
  'TKT',
  'TLT',
  'TMT',
  'TRT',
  'TOT',
  'TVT',
  'ULAST',
  'ULAT',
  'UTC',
  'UYST',
  'UYT',
  'UZT',
  'VLAT',
  'VOST',
  'VUT',
  'WAKT',
  'WAST',
  'WAT',
  'WEST',
  'WIB',
  'WGST',
  'WGT',
  'WST',
  'YAKT',
  'YEKT',
];

let awsAcronyms = [
  'ACL',
  'AMI',
  'ARN',
  'ASG',
  'AWS',
  'AZ',
  'CDK',
  'CF',
  'EBS',
  'EC2',
  'ECS',
  'EFS',
  'EIP',
  'ELB',
  'EMR',
  'ENI',
  'IAM',
  'IGW',
  'KMS',
  'RDS',
  'S3',
  'SES',
  'SNS',
  'SQS',
  'STS',
  'SWF',
  'VPC',
  'VPG',
];

let localAcronyms = ['GA'];

export const abbreviations = commonAbbreviations.concat(
  timeAbbreviations,
  commonTechAbbreviations,
  awsAcronyms,
  localAcronyms
);
