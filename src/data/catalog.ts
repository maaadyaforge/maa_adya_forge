export const ASSETS = {
  headerLogo: '/assets/aistudio/Website_Logo_7cb475ae.jpeg',
  aboutLegacyHistory: '/assets/aistudio/legacy-history_fc414392.svg',
  brochurePdf: '/assets/aistudio/MAA_Adya_Forge_Brochure_cdbe1d6a.pdf',
  castablesPdf: '/assets/aistudio/Maa_Adya_Forge_-_Castables_Product_Data_Book_35c7e92f.pdf',
  heroKiln: '/src/assets/images/hero_refractory_kiln_1795203598307.jpg',
  catRefractoryBricks: '/src/assets/images/product_refractory_bricks_1795203597710.jpg',
  catCastables: '/src/assets/images/product_castables_mortars_1795203599082.jpg',
  catMortarsCompounds: '/src/assets/images/cat_mortars_compounds_1795206196017.jpg',
  subBrickFireclayIs6: '/src/assets/images/sub_brick_fireclay_is6_1795207596593.jpg',
  subBrickFire42: '/src/assets/images/sub_brick_fire_42_1795207448364.jpg',
  subBrickHighAlumina: '/src/assets/images/sub_brick_high_alumina_1795207436679.jpg',
  subBrickPrecast: '/src/assets/images/sub_brick_precast_1795207437023.jpg',
  subBrickHeavyBlocks: '/src/assets/images/sub_brick_heavy_blocks_1795207436684.jpg',
  subBrickMagCarbon: '/src/assets/images/sub_brick_mag_carbon_1795207436403.jpg',
  subCastAcidResistant: '/src/assets/images/sub_cast_acid_resistant_1795207659583.jpg',
  subCastCoilCoating: '/src/assets/images/sub_cast_coil_coating_1795207658932.jpg',
  subCastDense97: '/src/assets/images/sub_cast_dense_97_1795207627677.jpg',
  subCastGelBonded: '/src/assets/images/sub_cast_gel_bonded_1795207658927.jpg',
  subCastInsulating: '/src/assets/images/sub_cast_insulating_1795207627191.jpg',
  subCastLowCement: '/src/assets/images/sub_cast_low_cement_1795207626418.jpg',
  subCastPhosphate: '/src/assets/images/sub_cast_phosphate_1795207691942.jpg',
  subCastSelfFlow: '/src/assets/images/sub_cast_self_flow_1795207692877.jpg',
  subCastSicLc: '/src/assets/images/sub_cast_sic_lc_1795207691244.jpg',
  subCastSicPlastic: '/src/assets/images/sub_cast_sic_plastic_1795207691584.jpg',
  subCastDriKiln: '/src/assets/images/sub_cast_dri_kiln_1795207691510.jpg',
  subCastTrough: '/src/assets/images/sub_cast_trough_1795207690769.jpg',
  subMortar90k: '/src/assets/images/sub_mortar_90k_1795207765195.jpg',
  subMortarAirSetting: '/src/assets/images/sub_mortar_air_setting_1795207748555.jpg',
  subMortarExpansive: '/src/assets/images/sub_mortar_expansive_1795207748668.jpg',
  subMortarFireClay: '/src/assets/images/sub_mortar_fire_clay_1795207748023.jpg',
  subMortarHighAlumina: '/src/assets/images/sub_mortar_high_alumina_1795207747948.jpg',
  subMortarSilica: '/src/assets/images/sub_mortar_silica_1795207749526.jpg',
  subMortarMagnesia: '/src/assets/images/sub_mortar_magnesia_1795207750610.jpg',
  forgingRings: '/src/assets/images/forging_rings_1795206198454.jpg',
  forgingShaftsFlanges: '/src/assets/images/forging_shafts_flanges_1795206197028.jpg',
  forgingBlocks: '/src/assets/images/forging_blocks_1795206196314.jpg',
  autoDriveShafts: '/src/assets/images/auto_drive_shafts_1795206195783.jpg',
  autoUjointYokes: '/src/assets/images/auto_ujoint_yokes_1795206196375.jpg',
  autoCamshaft: '/src/assets/images/auto_camshaft_1795206195898.jpg',
  autoConnectingRod: '/src/assets/images/auto_connecting_rod_1795206196138.jpg',
  galleryFoundryFloor: '/src/assets/images/about_foundry_legacy_1795203600220.jpg',
  galleryBricksProduction: '/src/assets/images/gallery_bricks_production_1795206196259.jpg',
  galleryTestingLab: '/src/assets/images/gallery_testing_lab_1795206196614.jpg',
  galleryForgingShowcase: '/src/assets/images/product_industrial_forging_1795203676371.jpg',
} as const;

export const PLANT_CONTACT = {
  address: 'Nehru Road, Chirkunda, Dhanbad, Jharkhand. Pincode - 828202.',
  helpline: '+91-7033522500',
  emailOrders: 'maaadyaforge@gmail.com',
} as const;

export type RefractoryCategoryKey = 'bricks' | 'castables' | 'mortars';

export interface SubProductItem {
  id: string;
  name: string;
  grade: string;
  tempRating: string;
  img: string;
}

export interface RefractoryCategory {
  key: RefractoryCategoryKey;
  title: string;
  collectionTitle: string;
  summary: string;
  img: string;
  items: SubProductItem[];
}

export interface IndustrialProduct {
  id: string;
  name: string;
  division: 'Forging' | 'Automotive';
  description: string;
  img: string;
  specs: Array<{ label: string; value: string }>;
}

export interface ExportDestination {
  country: string;
  flagCode: 'NP' | 'BD' | 'ZA' | 'MM';
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  img: string;
}

export interface ClientEnterprise {
  id: 'lt' | 'ntpc' | 'nrl' | 'bhel';
  code: string;
  name: string;
  subtitle: string;
}

export interface Testimonial {
  id: string;
  initials: string;
  name: string;
  role: string;
  quote: string;
  avatarTone: string;
}

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Global Exporter', href: '#exporter' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Clients', href: '#clients' },
] as const;

export const REFRACTORY_CATEGORIES: RefractoryCategory[] = [
  {
    key: 'bricks',
    title: 'Refractory Bricks & Shapes',
    collectionTitle: 'Refractory Bricks & Shapes Collection',
    summary:
      'Engineered for severe thermal stress and high-temperature industrial furnaces.',
    img: ASSETS.catRefractoryBricks,
    items: [
      {
        id: 'bricks-is6-is8',
        name: 'Fire Clay IS:6 & IS:8 bricks, blocks & tiles',
        grade: 'IS:6 / IS:8 Fireclay',
        tempRating: '1400°C',
        img: ASSETS.subBrickFireclayIs6,
      },
      {
        id: 'bricks-42-40',
        name: 'Fire Bricks 42%, 42D, 42SD, 40%, 40D, 40SD',
        grade: '40%–42% Alumina',
        tempRating: '1500°C',
        img: ASSETS.subBrickFire42,
      },
      {
        id: 'bricks-high-alumina',
        name: 'High Alumina Bricks, Blocks and Tiles Upto 90%',
        grade: 'Up to 90% Al₂O₃',
        tempRating: '1750°C',
        img: ASSETS.subBrickHighAlumina,
      },
      {
        id: 'bricks-precast',
        name: 'Precast Prefired Blocks',
        grade: 'Custom Kiln Shapes',
        tempRating: '1650°C',
        img: ASSETS.subBrickPrecast,
      },
      {
        id: 'bricks-standard',
        name: 'Refractory Bricks & Blocks',
        grade: 'Heavy Furnace Lining',
        tempRating: '1600°C',
        img: ASSETS.subBrickHeavyBlocks,
      },
      {
        id: 'bricks-mag-carbon',
        name: 'Mag Carbon Bricks upto Mgo 85%, Carbon 15%',
        grade: 'MgO 85% / C 15%',
        tempRating: '1800°C',
        img: ASSETS.subBrickMagCarbon,
      },
    ],
  },
  {
    key: 'castables',
    title: 'Castables',
    collectionTitle: 'Castables Collection',
    summary:
      'Monolithic refractory mixes for seamless furnace linings, casting, and gunning.',
    img: ASSETS.catCastables,
    items: [
      {
        id: 'cast-acid-resistant',
        name: 'Acid Resistant High Alumina Castables',
        grade: 'Chemical & Acid Zones',
        tempRating: '1450°C',
        img: ASSETS.subCastAcidResistant,
      },
      {
        id: 'cast-coil-coating',
        name: 'Coil Coating Castables',
        grade: 'Induction Furnace Coils',
        tempRating: '1600°C',
        img: ASSETS.subCastCoilCoating,
      },
      {
        id: 'cast-dense-97',
        name: 'Dense Castables (Upto 97% Alumina) Casting/ Gunning',
        grade: 'Up to 97% Al₂O₃',
        tempRating: '1800°C',
        img: ASSETS.subCastDense97,
      },
      {
        id: 'cast-gel-bonded',
        name: 'Gel Bonded Castables',
        grade: 'Rapid Dry-Out',
        tempRating: '1650°C',
        img: ASSETS.subCastGelBonded,
      },
      {
        id: 'cast-insulating',
        name: 'Insulating Castables (Bulk Density 0.45 - 1.6gm/cc)',
        grade: '0.45–1.60 g/cc',
        tempRating: '1350°C',
        img: ASSETS.subCastInsulating,
      },
      {
        id: 'cast-low-cement',
        name: 'Low Cement Castables(Up to 94% Alumina)',
        grade: 'Up to 94% Al₂O₃',
        tempRating: '1750°C',
        img: ASSETS.subCastLowCement,
      },
      {
        id: 'cast-phosphate',
        name: 'Phosphate Bonded Castables (Plastic Refractory)',
        grade: 'Plastic Refractory',
        tempRating: '1650°C',
        img: ASSETS.subCastPhosphate,
      },
      {
        id: 'cast-self-flow',
        name: 'Self-flow Castables',
        grade: 'Vibration-Free Pour',
        tempRating: '1700°C',
        img: ASSETS.subCastSelfFlow,
      },
      {
        id: 'cast-sic-lc',
        name: 'Silicon Carbide Based LC Castables',
        grade: 'High Abrasion SiC',
        tempRating: '1600°C',
        img: ASSETS.subCastSicLc,
      },
      {
        id: 'cast-sic-plastic',
        name: 'Silicon Carbide Based Plastic Refractory',
        grade: 'Thermal Shock SiC',
        tempRating: '1550°C',
        img: ASSETS.subCastSicPlastic,
      },
      {
        id: 'cast-dri',
        name: 'Special LC Castable For DRI Plants',
        grade: 'DRI Kiln Grade',
        tempRating: '1600°C',
        img: ASSETS.subCastDriKiln,
      },
      {
        id: 'cast-trough',
        name: 'Trough Castables',
        grade: 'Blast Furnace Runners',
        tempRating: '1700°C',
        img: ASSETS.subCastTrough,
      },
    ],
  },
  {
    key: 'mortars',
    title: 'Mortars & Compounds',
    collectionTitle: 'Mortars & Compounds Collection',
    summary:
      'High-temperature jointing mortars, expansive mixes, and sealing compounds.',
    img: ASSETS.catMortarsCompounds,
    items: [
      {
        id: 'mortar-90k',
        name: '90k Mortars',
        grade: 'Ultra-High Alumina',
        tempRating: '1780°C',
        img: ASSETS.subMortar90k,
      },
      {
        id: 'mortar-air-setting',
        name: 'Air Setting Mortars',
        grade: 'Ambient Bond',
        tempRating: '1600°C',
        img: ASSETS.subMortarAirSetting,
      },
      {
        id: 'mortar-expansive',
        name: 'Expansive Mortars',
        grade: 'Zero-Shrinkage Joint',
        tempRating: '1650°C',
        img: ASSETS.subMortarExpansive,
      },
      {
        id: 'mortar-fire-clay',
        name: 'Fire Clay Mortars',
        grade: 'IS Standard Clay',
        tempRating: '1450°C',
        img: ASSETS.subMortarFireClay,
      },
      {
        id: 'mortar-high-alumina',
        name: 'High Alumina Mortars',
        grade: 'High-Temp Bonding',
        tempRating: '1750°C',
        img: ASSETS.subMortarHighAlumina,
      },
      {
        id: 'mortar-silica',
        name: 'Silica Mortars',
        grade: 'Coke Oven / Glass',
        tempRating: '1680°C',
        img: ASSETS.subMortarSilica,
      },
      {
        id: 'mortar-magnesia',
        name: 'Magnesia Mortars',
        grade: 'Basic Steelmaking',
        tempRating: '1800°C',
        img: ASSETS.subMortarMagnesia,
      },
    ],
  },
];

export const FORGING_PRODUCTS: IndustrialProduct[] = [
  {
    id: 'forging-rings',
    name: 'Industrial Forged Rings',
    division: 'Forging',
    description:
      'Seamless rolled and hammered metal rings crafted from carbon and alloy steel.',
    img: ASSETS.forgingRings,
    specs: [
      { label: 'Material', value: 'Alloy Steel' },
      { label: 'Strength', value: 'High Tensile' },
    ],
  },
  {
    id: 'forging-shafts',
    name: 'Heavy Duty Shafts & Flanges',
    division: 'Forging',
    description:
      'Precision open-die components engineered for rotational torque and high-pressure pipelines.',
    img: ASSETS.forgingShaftsFlanges,
    specs: [
      { label: 'Process', value: 'Open Die' },
      { label: 'Tolerance', value: 'Precision' },
    ],
  },
  {
    id: 'forging-blocks',
    name: 'Custom Forged Blocks',
    division: 'Forging',
    description:
      'Heavy steel blocks forged under multi-ton hydraulic presses with ultrasonic inspection.',
    img: ASSETS.forgingBlocks,
    specs: [
      { label: 'Treatment', value: 'Heat Treated' },
      { label: 'Quality', value: 'UT Tested' },
    ],
  },
];

export const AUTOMOTIVE_PRODUCTS: IndustrialProduct[] = [
  {
    id: 'auto-shafts',
    name: 'Shafts',
    division: 'Automotive',
    description:
      'Precision forged transmission and drive shafts engineered for commercial vehicles.',
    img: ASSETS.autoDriveShafts,
    specs: [
      { label: 'Application', value: 'Drivetrain' },
      { label: 'Standard', value: 'OEM Grade' },
    ],
  },
  {
    id: 'auto-yokes',
    name: 'Universal Joint Yokes',
    division: 'Automotive',
    description:
      'Robust forged U-joint yokes built for continuous high rotational stress.',
    img: ASSETS.autoUjointYokes,
    specs: [
      { label: 'Application', value: 'Steering' },
      { label: 'Durability', value: 'High Fatigue' },
    ],
  },
  {
    id: 'auto-camshaft',
    name: 'Camshaft',
    division: 'Automotive',
    description:
      'High-precision forged and heat-treated camshafts for accurate engine valve timing.',
    img: ASSETS.autoCamshaft,
    specs: [
      { label: 'Application', value: 'Engine Valve' },
      { label: 'Finish', value: 'Precision Ground' },
    ],
  },
  {
    id: 'auto-conrod',
    name: 'Connecting Rod',
    division: 'Automotive',
    description:
      'Drop-forged connecting rods designed to convert piston motion into reliable torque.',
    img: ASSETS.autoConnectingRod,
    specs: [
      { label: 'Application', value: 'Piston Assembly' },
      { label: 'Strength', value: 'Superior Tensile' },
    ],
  },
];

export const EXPORT_DESTINATIONS: ExportDestination[] = [
  {
    country: 'Nepal',
    flagCode: 'NP',
    description:
      'Regular dispatch of heavy refractory bricks and castables via dedicated highway freight.',
  },
  {
    country: 'Bangladesh',
    flagCode: 'BD',
    description:
      'Direct railway and port logistics supplying custom forged rings and kiln linings.',
  },
  {
    country: 'South Africa',
    flagCode: 'ZA',
    description:
      'Containerized maritime delivery of high-alumina bricks and heavy-duty forged shafts.',
  },
  {
    country: 'Myanmar',
    flagCode: 'MM',
    description:
      'Reliable supply of monolithic refractory linings and forged industrial components.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-foundry',
    title: 'Factory Foundry Floor',
    caption:
      'Automated refractory pressing line with calibrated hydraulic tonnage and firing control.',
    img: ASSETS.galleryFoundryFloor,
  },
  {
    id: 'gal-bricks',
    title: 'Refractory Bricks Production',
    caption:
      'High-alumina bricks and kiln arch shapes emerging from our high-temperature tunnel kiln.',
    img: ASSETS.galleryBricksProduction,
  },
  {
    id: 'gal-testing-lab',
    title: 'Refractory Testing Laboratory',
    caption:
      'Dedicated muffle furnace and hydraulic compression testing lab verifying bulk density and CCS.',
    img: ASSETS.galleryTestingLab,
  },
  {
    id: 'gal-forging',
    title: 'Forged Rings & Automotive Spares',
    caption:
      'Precision-machined alloy rings, shafts, and drop-forged drivetrain components.',
    img: ASSETS.galleryForgingShowcase,
  },
];

export const ESTEEMED_CLIENTS: ClientEnterprise[] = [
  {
    id: 'lt',
    code: 'L&T',
    name: 'Larsen & Toubro',
    subtitle: 'Heavy Engineering & Infrastructure',
  },
  {
    id: 'ntpc',
    code: 'NTPC',
    name: 'NTPC Limited',
    subtitle: 'Powering India',
  },
  {
    id: 'nrl',
    code: 'NRL',
    name: 'Numaligarh Refinery',
    subtitle: 'Petrochemical & Refining',
  },
  {
    id: 'bhel',
    code: 'BHEL',
    name: 'Bharat Heavy Electricals',
    subtitle: 'Heavy Electricals & Turbines',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-sameer',
    initials: 'AS',
    name: 'Ar. Sameer Malhotra',
    role: 'Principal Architect, Opus Designs',
    quote:
      "We used Maa Adya's high alumina refractories for our high-temperature furnace lining. The thermal endurance and zero spalling during continuous operation was exceptional.",
    avatarTone: 'bg-terracotta-100 text-terracotta-700',
  },
  {
    id: 't-rakesh',
    initials: 'RK',
    name: 'Rakesh Kumar',
    role: 'Managing Director, Skyline Infrastructure',
    quote:
      "For heavy industrial machinery, forged shaft and yoke quality is non-negotiable. Maa Adya's forgings consistently test above required tolerances. Their plant fleet ensures on-time deliveries.",
    avatarTone: 'bg-amber-gold-400/20 text-amber-gold-600',
  },
  {
    id: 't-vikram',
    initials: 'VP',
    name: 'Vikram Patel',
    role: 'Chief Engineer, Buildcon Group',
    quote:
      'Their technical sales team honored bulk pricing transparently and provided complete metallurgical test reports. Maa Adya is our go-to partner for all critical forge requirements.',
    avatarTone: 'bg-slate-900 text-white',
  },
];
