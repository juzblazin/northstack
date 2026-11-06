import type { Province, ProvinceCode } from './types'

export const provinces: Record<ProvinceCode, Province> = {
  bc: {
    code: 'bc',
    name: 'British Columbia',
    blurb:
      'BC-based SMBs deal with a split PST/GST system, the Employer Health Tax on larger payrolls, and some of the strongest regional tech incentives in the country.',
    salesTax: { label: 'GST + PST', rate: '5% + 7%', note: 'Separate PST registration required once you sell taxable goods or software in BC.' },
    smallBizRate: '2%',
    generalRate: '12%',
    minWage: '$17.85/hr',
    wageNote: 'June 2025 rate; adjusted annually each June 1.',
    workersComp: 'WorkSafeBC',
    employmentBody: 'BC Employment Standards Act',
    grants: [
      { name: 'Innovate BC programs', desc: 'Ignite and Fast Pilot funding for BC tech commercialization projects.' },
      { name: 'BC SR&ED credit', desc: '10% refundable provincial credit stacking on federal SR&ED for CCPCs.' },
      { name: 'PacifiCan funding', desc: 'Regional development agency programs for BC SMEs scaling or exporting.' },
    ],
    checklist: [
      {
        group: 'Registration',
        tasks: ['Incorporate or register extra-provincially via BC Registries', 'Register for GST with CRA once taxable revenue passes $30,000', 'Register for a PST account with the province', 'Get a municipal business licence for each city you operate in'],
      },
      {
        group: 'Payroll',
        tasks: ['Open a CRA payroll program account before first hire', 'Register with WorkSafeBC within 10 days of hiring', 'Register for Employer Health Tax if annual BC payroll exceeds $500,000', 'Set up vacation pay accrual (4% under 5 years, 6% after)'],
      },
      {
        group: 'Annual',
        tasks: ['File T2 corporate return within 6 months of year end', 'File BC corporate return (Schedule 427 for provincial credits)', 'File PST returns on your assigned frequency', 'Renew municipal business licences'],
      },
    ],
  },
  ab: {
    code: 'ab',
    name: 'Alberta',
    blurb:
      'Alberta keeps it simple: no provincial sales tax, the lowest general corporate rate in Canada, and straightforward payroll rules.',
    salesTax: { label: 'GST only', rate: '5%', note: 'No PST. Register for GST with CRA once taxable revenue passes $30,000.' },
    smallBizRate: '2%',
    generalRate: '8%',
    minWage: '$15.00/hr',
    wageNote: 'General minimum wage; unchanged since 2018.',
    workersComp: 'WCB Alberta',
    employmentBody: 'Alberta Employment Standards Code',
    grants: [
      { name: 'Alberta Innovates', desc: 'Vouchers and R&D funding for Alberta tech and applied research projects.' },
      { name: 'Canada-Alberta Job Grant', desc: 'Up to two-thirds of employee training costs, capped per trainee.' },
      { name: 'PrairiesCan funding', desc: 'Regional development programs for Alberta SMEs scaling or exporting.' },
    ],
    checklist: [
      {
        group: 'Registration',
        tasks: ['Incorporate via Alberta Corporate Registry', 'Register for GST with CRA once taxable revenue passes $30,000', 'Get a municipal business licence', 'Register a trade name if operating under a different name'],
      },
      {
        group: 'Payroll',
        tasks: ['Open a CRA payroll program account', 'Register with WCB Alberta within 15 days of hiring', 'Set up vacation pay accrual (4% under 5 years, 6% after)', 'Confirm overtime rules — Alberta uses 8/44 daily and weekly thresholds'],
      },
      {
        group: 'Annual',
        tasks: ['File T2 corporate return within 6 months of year end', 'File AT1 Alberta corporate return (separate from T2)', 'Renew municipal business licences'],
      },
    ],
  },
  on: {
    code: 'on',
    name: 'Ontario',
    blurb:
      'Ontario SMBs run on a single 13% HST, contend with Employer Health Tax past the exemption threshold, and have the deepest grant ecosystem in Canada.',
    salesTax: { label: 'HST', rate: '13%', note: 'Single harmonized tax administered by CRA. Register once taxable revenue passes $30,000.' },
    smallBizRate: '3.2%',
    generalRate: '11.5%',
    minWage: '$17.60/hr',
    wageNote: 'October 2025 rate; adjusted annually each October 1.',
    workersComp: 'WSIB',
    employmentBody: 'Ontario Employment Standards Act, 2000',
    grants: [
      { name: 'Ontario Creates / OMDC', desc: 'Interactive digital media and cultural industry tax credits and funds.' },
      { name: 'FedDev Ontario', desc: 'Regional development programs for southern Ontario SMEs.' },
      { name: 'Ontario Made Manufacturing Investment Tax Credit', desc: '10% refundable credit on qualifying buildings, machinery and equipment.' },
    ],
    checklist: [
      {
        group: 'Registration',
        tasks: ['Incorporate via Ontario Business Registry', 'Register for HST with CRA once taxable revenue passes $30,000', 'Get a municipal business licence', 'Register a business name if operating under a different name'],
      },
      {
        group: 'Payroll',
        tasks: ['Open a CRA payroll program account', 'Register with WSIB within 10 days of hiring', 'Register for Employer Health Tax if payroll exceeds the $1M exemption', 'Provide mandatory AODA and workplace safety training'],
      },
      {
        group: 'Annual',
        tasks: ['File T2 corporate return within 6 months of year end', 'File EHT return if registered', 'File annual return via Ontario Business Registry (by May with CRA filing)', 'Renew municipal business licences'],
      },
    ],
  },
  qc: {
    code: 'qc',
    name: 'Quebec & Other Provinces',
    blurb:
      'Quebec runs its own tax agency (Revenu Québec), a QST on top of GST, distinct payroll bodies (CNESST, QPIP, HSF), and French-language obligations most other provinces lack.',
    salesTax: { label: 'GST + QST', rate: '5% + 9.975%', note: 'QST is administered by Revenu Québec, not CRA — a separate registration.' },
    smallBizRate: '3.2%',
    generalRate: '11.5%',
    minWage: '$16.10/hr',
    wageNote: 'May 2025 rate; adjusted annually each May 1.',
    workersComp: 'CNESST',
    employmentBody: 'Act respecting labour standards (CNESST)',
    grants: [
      { name: 'Investissement Québec', desc: 'Tax credits, loans and wage subsidies across sectors.' },
      { name: 'Quebec SR&ED credit', desc: 'Provincial R&D wage tax credit stacking on federal SR&ED.' },
      { name: 'CDAP successors / PCAN', desc: 'Digital adoption and regional growth programs via Canada Economic Development for Quebec Regions.' },
    ],
    checklist: [
      {
        group: 'Registration',
        tasks: ['Incorporate via Registraire des entreprises (NEQ)', 'Register for GST with CRA', 'Register separately for QST with Revenu Québec', 'Review French-language obligations under the Charter (Bill 96)'],
      },
      {
        group: 'Payroll',
        tasks: ['Open a CRA payroll account AND a Revenu Québec source deductions account', 'Register with CNESST for workplace insurance', 'Budget for QPIP (parental insurance) employer premiums', 'Budget for Health Services Fund (HSF) contributions scaled to payroll'],
      },
      {
        group: 'Annual',
        tasks: ['File T2 federal return AND CO-17 provincial return', 'File QST returns on your assigned frequency', 'File the annual updating declaration with the Registraire', 'Renew municipal permits'],
      },
    ],
  },
}

export const provinceCodes = Object.keys(provinces) as ProvinceCode[]

export const isProvince = (v: string): v is ProvinceCode => v in provinces
