import SectionReveal from '@/components/SectionReveal'
import PageCta from '@/components/PageCta'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// ─── Article data ─────────────────────────────────────────────────────────────
interface Article {
  title: string
  category: string
  date: string
  excerpt: string
  sections: { heading?: string; body: string }[]
}

const articles: Record<string, Article> = {
  'understanding-environmental-impact-assessments': {
    title: 'Understanding Environmental Impact Assessments: A Complete Guide',
    category: 'Guide',
    date: 'January 15, 2024',
    excerpt: 'EIA is both a regulatory requirement and a strategic tool. Here\'s everything you need to know before your project begins.',
    sections: [
      {
        body: 'Environmental Impact Assessment (EIA) is a systematic process that evaluates the potential environmental effects of a proposed project before it is approved or carried out. In India, EIA is mandated by the Ministry of Environment, Forest and Climate Change (MoEF&CC) for various categories of projects under the EIA Notification 2006.',
      },
      {
        heading: 'When is EIA Required?',
        body: 'EIA is required for projects listed under the EIA Notification 2006 and its subsequent amendments. This includes industrial facilities, mining projects, infrastructure development, townships, thermal power plants, and more. The category (A or B) and associated requirements vary based on project size, location, and potential environmental impact.',
      },
      {
        heading: 'The EIA Process — Step by Step',
        body: 'The process typically involves: Screening (determining whether EIA is required and at what level), Scoping (identifying key environmental issues), Baseline Data Collection (documenting existing conditions), Impact Prediction (modelling potential effects), Mitigation Measures (strategies to reduce adverse impacts), Public Consultation (engaging stakeholders and affected communities), and the Environmental Management Plan (an ongoing monitoring and compliance framework).',
      },
      {
        heading: 'Key Areas a Comprehensive EIA Must Cover',
        body: 'A thorough EIA addresses air quality and emissions, water resources and quality, soil and land use change, biodiversity and ecosystem impacts, socio-economic effects on local communities, noise and vibration, and a risk and hazard analysis appropriate to the project type.',
      },
      {
        heading: 'Best Practices for a Successful EIA',
        body: 'Engage stakeholders early — before formal public consultation. Use qualified environmental professionals with credentials recognised by regulatory bodies. Collect accurate, site-specific baseline data rather than relying on secondary sources. Develop realistic, enforceable mitigation measures. Plan for adaptive management and post-approval monitoring from the outset.',
      },
      {
        heading: 'Why EIA Is More Than a Compliance Exercise',
        body: 'A well-conducted EIA is an opportunity to identify environmental and social risks before they become project delays or liabilities. Organisations that treat EIA as a strategic tool — rather than a box-ticking exercise — consistently achieve faster clearances, lower project costs, and stronger community relationships.',
      },
    ],
  },
  'esg-reporting-trends-2024': {
    title: 'ESG Reporting Trends for 2024: What Businesses Need to Know',
    category: 'Trends',
    date: 'January 10, 2024',
    excerpt: 'ESG reporting has shifted from voluntary practice to regulatory mandate. Here\'s how the landscape is evolving in India and what your business needs to do.',
    sections: [
      {
        body: 'Environmental, Social, and Governance (ESG) reporting has moved from a voluntary practice to a business imperative. As we move through 2024, several key trends are reshaping the ESG landscape for Indian businesses — both listed companies and those in their supply chains.',
      },
      {
        heading: 'Regulatory Developments in India',
        body: 'SEBI\'s Business Responsibility and Sustainability Report (BRSR) requirements continue to evolve. Key developments include an extended scope requiring listed companies to report on their value chain partners, enhanced climate-related financial disclosures aligned with TCFD, and standardised metrics that allow for easier year-on-year comparison and investor benchmarking.',
      },
      {
        heading: 'Global Standards Convergence',
        body: 'The convergence of global ESG frameworks is accelerating. ISSB standards are gaining adoption across major economies. TCFD recommendations are becoming mandatory in several jurisdictions. GRI standards have been updated for better alignment with financial reporting norms. Indian companies with international investors or supply chain exposure are increasingly expected to comply with more than just BRSR.',
      },
      {
        heading: 'Technology Is Transforming ESG Reporting',
        body: 'AI-powered data collection is reducing the manual burden of ESG data gathering. Blockchain is being used for supply chain transparency and emissions tracking. Real-time monitoring capabilities are enabling quarterly or even monthly ESG dashboards — moving beyond the traditional annual report cycle. Third-party data verification and assurance is growing rapidly as investors demand greater confidence in reported numbers.',
      },
      {
        heading: 'Five Trends to Watch Closely',
        body: 'Climate Disclosures: Enhanced, quantified climate risk disclosures aligned with TCFD are becoming standard. Scope 3 Emissions: Value chain emissions are increasingly in scope for large companies. Social Metrics: Diversity, equity, and inclusion data is moving from narrative to numerical. Assurance: Third-party verification of ESG data is shifting from optional to expected. Integration: ESG performance is being embedded into financial reporting and board-level KPIs.',
      },
      {
        heading: 'How to Prepare',
        body: 'Assess your current data collection capabilities against BRSR requirements. Identify gaps in Scope 1, 2, and 3 emissions measurement. Engage your supply chain partners early on data sharing. Consider voluntary adoption of ISSB or GRI standards to future-proof your reporting. Seek professional guidance on materiality assessments — determining which ESG issues are most relevant to your stakeholders and business model.',
      },
    ],
  },
  'how-to-get-cto-in-assam': {
    title: 'How to Get a Consent to Operate (CTO) in Assam: A Step-by-Step Guide',
    category: 'Compliance',
    date: 'March 12, 2025',
    excerpt: 'A complete walkthrough of the Assam Pollution Control Board CTO application process — from eligibility to renewal.',
    sections: [
      {
        body: 'A Consent to Operate (CTO) is mandatory for most industrial and commercial establishments that discharge pollutants — air, water, or solid waste. In Assam, the Assam Pollution Control Board (APCB) under the Water (Prevention & Control of Pollution) Act 1974 and Air (Prevention & Control of Pollution) Act 1981 grants this consent. Operating without a valid CTO is a criminal offence and can result in closure orders, fines, and NGT action.',
      },
      {
        heading: 'Who Needs a CTO?',
        body: 'Any establishment classified as a Red, Orange, or Green category industry under the CPCB categories list. This includes manufacturing units, hospitals (for biomedical waste), hotels, construction material plants, food processing units, and many service-sector establishments with captive generators or effluent discharge.',
      },
      {
        heading: 'Documents Required',
        body: 'For a new CTO application you will typically need: site plan and layout drawings, process flow chart, details of raw materials and finished products, pollution control equipment details (ETP, STP, scrubbers), water consumption and effluent generation data, consent from local body (municipality/gram panchayat), and proof of land ownership or lease.',
      },
      {
        heading: 'Step-by-Step Application Process',
        body: 'Step 1: Register on the APCB e-consent portal (https://apcb.assam.gov.in). Step 2: Fill Form I (for Water Act) and Form-I (for Air Act) online. Step 3: Upload all supporting documents in PDF format. Step 4: Pay the prescribed fee online (varies by category and capacity). Step 5: Submit the application and note your application reference number. Step 6: An APCB inspector will visit your facility for site inspection. Step 7: If satisfactory, consent order is issued — typically within 60–90 days for Green/Orange, longer for Red category.',
      },
      {
        heading: 'CTO Renewal',
        body: 'CTO must be renewed before expiry — typically annually or every 5 years depending on category. Late renewal attracts a penalty surcharge of 10–50% of the consent fee. Applications must be submitted at least 90 days before expiry. Operating on an expired CTO is treated the same as operating without one.',
      },
      {
        heading: 'How GreenMind Can Help',
        body: 'Our team prepares complete CTO application packages — from process flow charts and ETP design documentation to inspector liaison and follow-up. We have successfully obtained CTOs for Red, Orange, and Green category units across Assam. Contact us to review your eligibility and get started.',
      },
    ],
  },
  'brsr-reporting-requirements-2025': {
    title: 'BRSR Reporting Requirements 2025: What Every Listed Company Needs to Know',
    category: 'Reporting',
    date: 'February 3, 2025',
    excerpt: "SEBI's Business Responsibility and Sustainability Report is now mandatory for top-1000 listed companies. Here's what you must disclose and how to prepare.",
    sections: [
      {
        body: "The Business Responsibility and Sustainability Report (BRSR) was mandated by SEBI (Securities and Exchange Board of India) from FY 2022-23 for the top 1,000 listed companies by market capitalisation. From FY 2023-24 onwards, BRSR Core — a subset of high-priority, independently assured disclosures — is mandatory. The BRSR represents India's transition from voluntary CSR reporting to a structured, disclosure-based ESG accountability framework.",
      },
      {
        heading: 'What Must Be Disclosed in BRSR?',
        body: "BRSR disclosures span three sections: Section A (General Disclosures — company details, operations, employees, value chain); Section B (Management & Process Disclosures — policies, targets, governance); and Section C (Principle-wise Performance Disclosures — the nine NGRBC principles covering environment, employee welfare, stakeholder engagement, governance, and more). Key metrics include GHG emissions (Scope 1 & 2), energy consumption, water intensity, waste generated, and gender pay equity data.",
      },
      {
        heading: 'BRSR Core and Third-Party Assurance',
        body: "From FY 2023-24, SEBI introduced BRSR Core — a set of Key Performance Indicators (KPIs) within BRSR that require 'reasonable assurance' from an independent third party (NABET-accredited verifier or Chartered Accountant). These include GHG emission intensity, water intensity per rupee of turnover, and waste management practices. Companies should start identifying their assurance provider 6 months before filing.",
      },
      {
        heading: 'Common Pitfalls in BRSR Preparation',
        body: "1. Scope 3 emissions confusion: BRSR asks for Scope 1 and 2 only in core metrics, but Scope 3 is increasingly expected in narrative sections. 2. Inconsistent baselines: Using different years for different metrics makes trend analysis impossible. 3. Value chain data gaps: Section A requires disclosures on value chain partners — many companies underestimate the data collection burden. 4. Late start: BRSR data collection requires system changes; starting 3 months before the filing deadline is too late.",
      },
      {
        heading: 'How to Prepare for Your Next BRSR Filing',
        body: "Start with a gap assessment against all BRSR Core indicators. Set up data collection systems for energy, water, and waste metrics at facility level. Identify Scope 1 and 2 emission sources and calculate baseline. Engage an assurance provider early. Review board-level ESG governance policies. GreenMind's BRSR advisory team can support you through all stages — from gap assessment to assured report submission.",
      },
    ],
  },
  'waste-management-rules-india': {
    title: 'A Practical Guide to Waste Management Rules in India',
    category: 'Compliance',
    date: 'January 20, 2025',
    excerpt: 'India has distinct regulatory frameworks for solid, hazardous, biomedical, e-waste, and plastic waste. This guide explains what applies to your business.',
    sections: [
      {
        body: "India's waste management regulatory framework is complex, with separate rules for each waste stream under the Environment Protection Act 1986. Non-compliance — even unintentional — carries criminal liability under Section 15 of the EPA. This guide covers the five key rules every business should understand.",
      },
      {
        heading: 'Solid Waste Management Rules 2016',
        body: 'Applicable to all urban local bodies and bulk waste generators (hotels, airports, industries generating >100 kg/day). Key obligations: segregation at source (wet, dry, hazardous), contracting with authorised recyclers, maintaining waste registers. Bulk generators must have a Site-Specific Waste Management Plan.',
      },
      {
        heading: 'Hazardous & Other Wastes (Management & Transboundary Movement) Rules 2016',
        body: 'Applicable to any facility generating, storing, transporting, or disposing of scheduled hazardous wastes. Requires authorisation from the State Pollution Control Board, proper labelling, storage in designated areas, manifest system for transportation, and disposal only at authorised facilities. Annual returns must be filed.',
      },
      {
        heading: 'Biomedical Waste Management Rules 2016',
        body: 'Applicable to all healthcare facilities (hospitals, clinics, labs, blood banks, animal houses). Wastes are classified in 8 categories (yellow, red, white, blue bags). Facilities must hold a BMW Authorisation from the State PCB, display colour-coded bins, maintain treatment records, and file annual reports. Common-Biomedical-Waste-Treatment-Facility (CBWTF) contracts are mandatory for small facilities.',
      },
      {
        heading: 'E-Waste (Management) Rules 2022',
        body: "Applicable to manufacturers, producers, refurbishers, and dealers of electronic equipment. India's EPR (Extended Producer Responsibility) framework requires producers to register on the CPCB portal, set annual collection targets, and report collection to CPCB. Corporate buyers disposing of bulk IT equipment must also ensure disposal through authorised e-waste recyclers.",
      },
      {
        heading: 'Plastic Waste Management Rules 2016 (Amended 2021)',
        body: "From July 1, 2022, India banned manufacture and use of specified single-use plastics (SUPs). Businesses must identify whether any of their packaging or products fall under the banned list, register under EPR if they are plastic importers/producers/brand owners, and set collection targets. Non-compliance carries fines up to ₹1 lakh and criminal prosecution.",
      },
    ],
  },
  'eia-notification-2006-guide': {
    title: 'EIA Notification 2006 Explained: Categories, Timelines & What Triggers Clearance',
    category: 'Guide',
    date: 'December 10, 2024',
    excerpt: 'A plain-language breakdown of the MoEF&CC EIA Notification 2006 — which projects need clearance, at what level, and how long it takes.',
    sections: [
      {
        body: "The Environmental Impact Assessment (EIA) Notification, S.O. 1533(E), issued by India's Ministry of Environment, Forest and Climate Change (MoEF&CC) on September 14, 2006 is the primary legal instrument governing when and how environmental clearance must be obtained before a project commences. It has been amended over 50 times since 2006 — keeping track of current obligations requires specialist knowledge.",
      },
      {
        heading: 'Category A vs Category B Projects',
        body: "Category A projects (appraised by the Expert Appraisal Committee at the central MoEF&CC level) are larger in scale, with potential for interstate or major environmental impact. These include thermal power plants above 25 MW, industrial estates above 500 ha, and mining projects above 50 ha. Category B projects (appraised by the State Expert Appraisal Committee, SEAC, at the SEIAA level) are smaller scale. Category B1 requires full EIA; Category B2 may be screened out.",
      },
      {
        heading: 'Projects Requiring Clearance (Schedule)',
        body: "The EIA Notification's Schedule lists 39 project/activity categories across sectors including: mining (coal, minerals, sand), thermal, nuclear, river valley, industrial estates, ports & harbours, airports, defence, highways, pipelines, townships, SEZs, tourism, and more. Whether a specific project triggers clearance depends on its size, capacity, and location (ecologically sensitive zones attract lower thresholds).",
      },
      {
        heading: 'The General Condition (GC)',
        body: "The General Condition states that irrespective of Category, any project within 10 km of a Protected Area, international boundary, ecologically sensitive area, or inter-state boundary must be treated as Category A. This catches many projects that developers assume are Category B.",
      },
      {
        heading: 'Timelines to Expect',
        body: "Category B2 screening: 60 days from submission. Category B1 EIA (SEAC): 4–9 months from TOR grant to EC, if no public hearing complications. Category A EIA (EAC/MoEF&CC): 12–24 months. Delays are common when baseline data is inadequate, public hearings are contested, or the appraisal committee requests additional studies. A well-prepared submission by an experienced consultant consistently achieves the lower end of these ranges.",
      },
    ],
  },
  'environmental-audit-checklist': {
    title: 'Environmental Audit Checklist: 10 Things an Inspector Will Look For',
    category: 'Guide',
    date: 'November 28, 2024',
    excerpt: 'Prepare for a Pollution Control Board inspection with this practical checklist of the 10 documents and systems every audited facility must have ready.',
    sections: [
      {
        body: "Pollution Control Board inspections can be announced or unannounced. Failing an inspection can result in show-cause notices, consent suspension, or closure orders. The best defence is systematic compliance — not scrambling before an inspection. Here are the 10 things an inspector will check first.",
      },
      {
        heading: '1. Valid Consent to Operate (CTO)',
        body: 'The first thing an inspector asks for. It must be current (not expired), displayed prominently, and match the facility\'s current processes and capacity. If you have expanded capacity beyond what is consented, you need an amended consent.',
      },
      {
        heading: '2. Effluent Treatment Plant (ETP) Operation Logs',
        body: 'Regular ETP operation and maintenance logs, including inlet and outlet parameters, chemical dosing records, and NABL-accredited lab analysis reports for effluent quality. Inspectors typically check the last 12 months.',
      },
      {
        heading: '3. Hazardous Waste Storage and Manifest Records',
        body: 'If you generate scheduled hazardous wastes, you need a designated, labelled storage area, up-to-date stock registers, and complete transport manifests for all disposal events. Gaps in the manifest chain are a serious red flag.',
      },
      {
        heading: '4. Air Emission Monitoring Reports',
        body: 'Stack emission monitoring from all process stacks and DG sets, conducted at the frequency specified in your consent (typically quarterly). Reports must be from NABL-accredited labs.',
      },
      {
        heading: '5–10: Additional Items',
        body: '5. Ambient air and noise monitoring data at facility boundary. 6. Annual Environmental Statement (Form V) filed with the PCB. 7. Worker training records on waste handling and emergency response. 8. Biomedical waste authorisation (if healthcare-related). 9. Tree plantation/compensatory afforestation records (if EC conditioned). 10. Environment Officer appointment letter (mandatory for Red category units).',
      },
      {
        heading: 'How to Stay Inspection-Ready',
        body: 'The most effective approach is a biannual internal audit using the same checklist an inspector would use, followed by immediate corrective action on any gaps. GreenMind offers a Compliance Readiness Retainer service that keeps your facility permanently inspection-ready — contact us to learn more.',
      },
    ],
  },
  'carbon-footprinting-for-msmes': {
    title: 'Carbon Footprinting for MSMEs: A Practical Starting Point',
    category: 'Guide',
    date: 'October 15, 2024',
    excerpt: 'You don\'t need a large sustainability team to start measuring your carbon footprint. Here\'s a practical, jargon-free guide for Indian MSMEs.',
    sections: [
      {
        body: "Carbon footprinting — measuring the greenhouse gases your organisation emits — has shifted from a large-company concern to a supply chain requirement for businesses of all sizes. Enterprise clients, export markets (particularly EU under CBAM), and lenders are now requesting GHG data from their MSME suppliers. Here's how to start without being overwhelmed.",
      },
      {
        heading: 'Scope 1, 2, and 3: What They Mean',
        body: 'Scope 1: Direct emissions from sources you own or control — fuel combustion in furnaces, boilers, vehicles, generators. Scope 2: Indirect emissions from purchased electricity. This is the largest and easiest-to-measure scope for most MSMEs. Scope 3: All other indirect emissions in your value chain — purchased materials, business travel, employee commuting, waste disposal, and use of your products. Scope 3 is complex and optional for most MSMEs initially.',
      },
      {
        heading: 'Data You Need to Collect',
        body: 'For Scope 1: Monthly diesel/LPG/furnace oil/coal consumption records (from purchase invoices). For Scope 2: Monthly electricity bills (units consumed, not just amount paid). Emission factors: use the latest IPCC factors for fuels, and the CEA grid emission factor for your state (available from the Central Electricity Authority\'s annual report). This alone gives you a credible Scope 1+2 footprint.',
      },
      {
        heading: 'Calculating Your Footprint',
        body: 'tCO₂e = Activity Data × Emission Factor. Example: 1,000 litres of diesel × 2.68 kgCO₂e/litre = 2.68 tCO₂e. For electricity: 50,000 kWh × 0.82 kgCO₂/kWh (Northeast India grid factor) = 41 tCO₂e. Sum all sources for your total annual footprint. Express as absolute (total tCO₂e/year) and intensity (tCO₂e per ₹ lakh turnover or per unit of product).',
      },
      {
        heading: 'What to Do with Your Footprint Number',
        body: 'Set a baseline year. Identify your largest emission sources (typically electricity or process fuel). Set a reduction target (even 5% year-on-year is credible). Report it in your ESG or sustainability disclosure. For supply chain requirements, issue a self-declaration or get third-party verification from a NABET-accredited agency. GreenMind offers a Carbon Footprinting service for MSMEs that delivers a complete, verifiable GHG inventory within 3–4 weeks.',
      },
    ],
  },
  // ── New slugs assigned in resources/page.tsx ──────────────────────────────
  'net-zero-strategy-guide': {
    title: 'How to Create a Credible Net-Zero Strategy',
    category: 'Strategy',
    date: 'May 11, 2024',
    excerpt: 'Understand what makes an environmental plan trustworthy — and how to avoid greenwashing pitfalls that undermine stakeholder confidence.',
    sections: [
      {
        body: 'A credible net-zero strategy is one that can withstand scrutiny from regulators, investors, lenders, and the public. The difference between a credible strategy and greenwashing often comes down to three things: scope, timeline, and measurability.',
      },
      {
        heading: 'Define Your Scope Clearly',
        body: 'Net-zero commitments must cover all material emission sources. For most Indian businesses, this means at minimum Scope 1 (direct emissions from owned/controlled sources) and Scope 2 (purchased energy). Increasingly, large corporates and listed companies must also include Scope 3 (value chain emissions). Leaving out Scope 3 while calling a plan "net-zero" is a common greenwashing risk.',
      },
      {
        heading: 'Set Science-Based Targets',
        body: 'A Science Based Target (SBT) is one that aligns with what climate science says is necessary to limit warming to 1.5°C. The Science Based Targets initiative (SBTi) provides a validated framework. Indian companies across sectors — manufacturing, IT, real estate — have set SBTs. Setting an SBT signals to international buyers and investors that your commitment is not self-assessed.',
      },
      {
        heading: 'Avoid Common Greenwashing Pitfalls',
        body: 'Vague claims ("we are committed to sustainability") without data are the first red flag. Over-reliance on carbon offsets before reducing actual emissions is the second. Offsets should be the last resort, not the strategy. Third: claiming net-zero without independent verification. Any serious commitment should be third-party verified by a NABET-accredited agency or equivalent.',
      },
      {
        heading: 'Build a Measurable Roadmap',
        body: 'Break the long-term target into annual milestones. Identify which emission sources you will reduce, by how much, and by when. Assign ownership within the organisation. Report progress annually — even if you miss a target, transparent reporting builds more trust than silence. GreenMind can support you through strategy development, GHG inventory, and target setting.',
      },
    ],
  },
  'environmental-compliance-checklist-2025': {
    title: 'Your 2025 Environmental Compliance Checklist',
    category: 'Reporting',
    date: 'May 4, 2024',
    excerpt: 'A practical, step-by-step checklist to ensure your business meets all statutory environmental obligations before year-end.',
    sections: [
      {
        body: 'Environmental compliance in India is governed by a layered framework of central and state laws. Missing a renewal, a return, or an inspection can result in closure orders, NGT notices, or criminal liability. Use this checklist to audit your facility\'s compliance status before year-end.',
      },
      {
        heading: 'Consent / Authorisation Renewals',
        body: 'Verify that your Consent to Establish (CTE) and Consent to Operate (CTO) under the Water Act and Air Act are valid and not expiring within the next 90 days. Check your Hazardous Waste Authorisation (if applicable). Confirm your Biomedical Waste Authorisation is current (if you are a healthcare facility). Check EPR registration status under applicable rules (plastic, e-waste).',
      },
      {
        heading: 'Annual Returns & Reports',
        body: 'File your Annual Environmental Statement (Form V) with the State PCB before September 30. Submit your Hazardous Waste Annual Return (Form 4) by June 30. For BRSR filers: confirm your data collection systems are active for the current financial year. For factories: check Factory Act returns and environmental obligations under the Schedule.',
      },
      {
        heading: 'Monitoring & Records',
        body: 'Confirm that stack emission monitoring and ambient air quality monitoring are up to date per your consent conditions. Check ETP/STP effluent quality monitoring records — are all parameters within consent limits? Verify that your environment officer has filed the required monthly/quarterly reports to the PCB portal.',
      },
      {
        heading: 'Waste Management',
        body: 'Verify that all hazardous waste is stored in labelled, bunded storage with valid manifest records. Confirm your authorised disposal agency contracts are current. Check that solid waste is being segregated and disposed of through authorised channels. Update your Waste Management Plan if operations have changed.',
      },
      {
        heading: 'How GreenMind Can Help',
        body: 'Our compliance audit service covers all statutory obligations applicable to your facility — across pollution control, waste management, environmental clearances, and reporting requirements. We deliver a written compliance gap report with prioritised actions and timelines. Contact us to schedule a compliance review.',
      },
    ],
  },
  'esg-disclosure-vs-green-hype': {
    title: 'ESG Disclosure vs. Green Hype: Why the Difference Matters',
    category: 'Communication',
    date: 'Mar 16, 2024',
    excerpt: 'Understand the difference between genuine ESG disclosure and performative sustainability communications — and why it matters to investors.',
    sections: [
      {
        body: "The volume of sustainability claims in corporate communications has grown faster than the substance behind them. 'Green hype' — or greenwashing — is not always deliberate. It often results from organisations reporting what they are doing rather than what it achieves, using narrative instead of data, and making comparisons without a clear baseline.",
      },
      {
        heading: 'What Makes Disclosure Genuine',
        body: 'Genuine ESG disclosure is: quantified (tonnes of CO₂, kilolitres of water, percentage of waste recycled — not "we reduced our footprint"), comparable (same metric, same boundary, same methodology year on year), verified (third-party assured by a NABET-accredited or equivalent body), and complete (covering all material issues, including those where performance is poor).',
      },
      {
        heading: 'The Green Hype Spectrum',
        body: 'Greenwashing exists on a spectrum. At the benign end: vague aspirational language with no data ("we are a sustainable company"). In the middle: cherry-picked metrics that exclude the largest emission sources. At the harmful end: fabricated certifications, false claims about products, or misleading comparisons (e.g., comparing absolute emissions to a competitor of a different size).',
      },
      {
        heading: 'Why Investors and Lenders Are Getting Stricter',
        body: "SEBI's BRSR framework and global standards like ISSB and TCFD are designed to make ESG disclosure as rigorous as financial disclosure. A company that cannot produce verified, quantified ESG data is increasingly seen as a governance risk — not just an environmental one. ESG data quality is now a factor in credit ratings, lending terms, and supply chain qualification.",
      },
      {
        heading: 'How to Move from Narrative to Disclosure',
        body: 'Start with a materiality assessment — identify the ESG issues most relevant to your sector and stakeholders. Set up data collection systems for those issues. Report against a recognised framework (GRI, BRSR, ISSB). Commission third-party assurance before making public claims. GreenMind\'s ESG disclosure advisory service helps organisations build the data infrastructure and reporting process needed for credible disclosure.',
      },
    ],
  },
  'carbon-footprinting-101': {
    title: 'Carbon Footprinting 101: From Scope 1 to Science-Based Targets',
    category: 'Guide',
    date: 'Dec 20, 2023',
    excerpt: 'Learn the fundamentals of carbon accounting — from Scope 1, 2, and 3 emissions to setting science-based reduction targets.',
    sections: [
      {
        body: 'Carbon footprinting is the process of measuring the total greenhouse gases (GHGs) an organisation generates — expressed in tonnes of CO₂ equivalent (tCO₂e). It is the foundation of any credible climate strategy, ESG disclosure, or net-zero commitment.',
      },
      {
        heading: 'Understanding the Three Scopes',
        body: 'Scope 1: Direct emissions from sources owned or controlled by the organisation — fuel combustion in boilers, furnaces, vehicles; process emissions; fugitive emissions (refrigerants, methane leaks). Scope 2: Indirect emissions from purchased electricity, heat, steam, or cooling. Scope 3: All other indirect emissions in the value chain — from raw material extraction, transportation, employee commuting, product use and end-of-life, to capital goods.',
      },
      {
        heading: 'GHG Protocol: The Global Standard',
        body: 'The GHG Protocol Corporate Accounting and Reporting Standard is the most widely used framework for carbon accounting worldwide. It defines scope boundaries, emission factor sources, and calculation methodologies. BRSR, GRI, and ISSB standards all reference GHG Protocol. For Indian facilities, use the Central Electricity Authority (CEA) grid emission factor for Scope 2 calculations.',
      },
      {
        heading: 'Setting Science-Based Reduction Targets',
        body: 'Once you have a baseline footprint, set reduction targets aligned with climate science. The SBTi Near-Term criteria require a 42% absolute reduction in Scope 1 and 2 emissions by 2030 from a 2020 baseline, and a 25% reduction in Scope 3. Long-term net-zero targets must cover all scopes and include a residual emissions offset plan for the fraction that cannot be eliminated.',
      },
      {
        heading: 'Getting Started',
        body: 'Step 1: Define your organisational boundary (operational control or equity share approach). Step 2: Identify all emission sources across Scope 1, 2, and relevant Scope 3 categories. Step 3: Collect activity data (fuel consumption, electricity bills, travel records). Step 4: Apply emission factors (IPCC, CEA, DEFRA). Step 5: Sum and report in tCO₂e. GreenMind delivers complete GHG inventories for organisations of any size, verified against GHG Protocol.',
      },
    ],
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResourcePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]
  if (!article) notFound()

  const slug = params.slug

  const wordCount = article.sections.reduce((acc, s) => {
    return acc + (s.body?.split(/\s+/).length ?? 0) + (s.heading?.split(/\s+/).length ?? 0)
  }, 0)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'GreenMind Services LLP', url: 'https://www.greenmindservices.com' },
    publisher: { '@type': 'Organization', name: 'GreenMind Services LLP', logo: { '@type': 'ImageObject', url: 'https://www.greenmindservices.com/og-image.jpg' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.greenmindservices.com/resources/${slug}` },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.greenmindservices.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.greenmindservices.com/resources' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.greenmindservices.com/resources/${slug}` },
    ],
  }

  return (
    <main>
      {/* ── Article Hero ── */}
      <section className="section-padding pt-32 border-b border-card relative overflow-hidden">
        {/* Category-based hero background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={({
              Guide:       'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=60',
              Compliance:  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=60',
              Reporting:   'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=60',
              Strategy:    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=60',
              Trends:      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=60',
            } as Record<string, string>)[article.category] ?? 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=60'}
            alt=""
            role="presentation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <SectionReveal>
            <Link
              href="/resources"
              className="inline-flex items-center min-h-[44px] text-secondary hover:text-primary mb-8 transition-colors text-sm font-body font-medium gap-1.5"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-primary/8 text-secondary text-xs font-body font-semibold rounded-full">
                {article.category}
              </span>
              <span className="text-primary/40 text-xs font-body">{article.date}</span>
              <span className="text-primary/35">·</span>
              <span className="text-primary/50 text-xs font-body">{readingTime} min read</span>
            </div>

            <h1 className="heading-display text-primary mb-4 md:mb-5 max-w-3xl">
              {article.title}
            </h1>
            <p className="text-primary/60 text-base md:text-lg max-w-2xl leading-relaxed">
              {article.excerpt}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Article Body ── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl">
            {article.sections.map((section, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="mb-8 md:mb-10">
                  {section.heading && (
                    <h2 className="font-display font-semibold text-lg md:text-xl text-primary mb-3">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-primary/75 text-base md:text-lg leading-[1.85] font-light">
                    {section.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related articles ── */}
      {(() => {
        const related = Object.entries(articles)
          .filter(([s, a]) => s !== params.slug && a.category === article.category)
          .slice(0, 2)
        if (related.length === 0) return null
        return (
          <section className="section-padding-tight bg-page/50">
            <div className="container-custom">
              <SectionReveal>
                <p className="label-section mb-3">Keep reading</p>
                <h2 className="heading-section text-primary mb-8">Related articles</h2>
              </SectionReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map(([s, a]) => (
                  <SectionReveal key={s} delay={0.1}>
                    <a href={`/resources/${s}`} className="group block card-base card-hover p-6 h-full">
                      <span className="inline-block px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-body font-semibold rounded-full border border-secondary/20 mb-3">
                        {a.category}
                      </span>
                      <h3 className="font-display font-semibold text-lg text-primary mb-2 group-hover:text-secondary transition-colors leading-snug">
                        {a.title}
                      </h3>
                      <p className="text-primary/55 text-sm leading-relaxed line-clamp-2">{a.excerpt}</p>
                      <div className="flex items-center text-secondary text-sm font-body font-semibold mt-4 group-hover:translate-x-1 transition-transform duration-300">
                        Read article
                        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </a>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── CTA ── */}
      <PageCta
        title="Need expert environmental guidance?"
        description="Our consultants can help you navigate environmental compliance, ESG reporting, and regulatory requirements — specific to your business and sector."
        buttonText="Book a Free Consultation"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  )
}
