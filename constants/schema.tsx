import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';

export const Vitals = [
  {
    value: 'blood_pressure',
    label: 'Blood Pressure'
  },
  {
    value: 'pulse',
    label: 'Pulse'
  },
  {
    value: 'temperature',
    label: 'Temperature (°C)'
  },
  {
    value: 'respiration',
    label: 'Respiration'
  },
  {
    value: 'saturation',
    label: 'SpO2'
  }
];
export const SaturationTakenLocation = [
  { value: 'InRoom', label: 'In Room Air' },
  { value: 'OnOxygen', label: 'On Oxygen' }
];

export const DepartmentList = [
  { value: "General", label: "General" },
  { value: "Neuro", label: "Neuro" },
  { value: "Psychiatry", label: "Psychiatry" }
]
export const provinceData = [
  'Province 1', 'Province 2', 'Province 3', 'Province 4', 'Province 5', 'Province 6', 'Province 7'
];
interface DistrictData {
  [key: string]: string[];
}

export const districtData: DistrictData = {
  'Province 1': [
    'Taplejung', 'Panchthar', 'Ilam', 'Jhapa', 'Morang', 'Sunsari', 'Dhankuta', 'Tehrathum', 'Sankhuwasabha',
    'Bhojpur', 'Solukhumbu', 'Okhaldhunga', 'Khotang', 'Udayapur'
  ],
  'Province 2': [
    'Saptari', 'Siraha', 'Dhanusha', 'Mahottari', 'Sarlahi', 'Rautahat', 'Bara', 'Parsa'
  ],
  'Province 3': [
    'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Nuwakot', 'Rasuwa', 'Dhading', 'Makwanpur', 'Ramechhap',
    'Sindhuli', 'Dolkha', 'Sindhupalchok', 'Kavrepalanchok'
  ],
  'Province 4': [
    'Gorkha', 'Lamjung', 'Tanahun', 'Syangja', 'Kaski', 'Manang', 'Mustang', 'Myagdi', 'Parbat', 'Baglung'
  ],
  'Province 5': [
    'Rupandehi', 'Kapilvastu', 'Nawalparasi', 'Rukum', 'Rolpa', 'Pyuthan', 'Arghakhanchi', 'Gulmi', 'Palpa'
  ],
  'Province 6': [
    'Dailekh', 'Dolpa', 'Jajarkot', 'Surkhet', 'Banke', 'Bardiya', 'Salyan', 'Rukum', 'Dang'
  ],
  'Province 7': [
    'Kailali', 'Kanchanpur', 'Dadeldhura', 'Baitadi', 'Darchula', 'Doti', 'Achham'
  ]
};
export const municipalityData:DistrictData = {
  'Taplejung': ['Phungling', 'Yangbarak', 'Miklajung'],
  'Panchthar': ['Phidim', 'Falelung', 'Hilihang'],
  'Ilam': ['Ilam', 'Mai', 'Mangalbare'],
  'Jhapa': ['Bhadrapur', 'Damak', 'Arjundhara', 'Kankai', 'Mechinagar'],
  'Morang': ['Biratnagar', 'Urlabari', 'Sundar Haraicha', 'Rangeli', 'Belbari'],
  'Sunsari': ['Inaruwa', 'Itahari', 'Dharan', 'Jhumka', 'Barah'],
  'Dhankuta': ['Dhankuta', 'Pakhribas', 'Chhathar', 'Sangurigadhi'],
  'Tehrathum': ['Myanglung', 'Laligurans', 'Aathrai Tribeni', 'Chhathar', 'Ghurmi'],
  'Sankhuwasabha': ['Khandbari', 'Chainpur', 'Makalu', 'Panchakhapan', 'Dharmadevi'],
  'Bhojpur': ['Bhojpur', 'Shadanand', 'Ramprasad Rai', 'Hatuwagadhi'],
  'Solukhumbu': ['Salleri', 'Dudhkoshi', 'Khumbu', 'Likhu'],
  'Okhaldhunga': ['Okhaldhunga', 'Likhu', 'Champadevi'],
  'Khotang': ['Diktel', 'Khotehang', 'Ainselu Kharka', 'Jantedhunga'],
  'Udayapur': ['Gaighat', 'Triyuga', 'Katari', 'Rauta Pandher', 'Chaudandigadhi'],
  'Saptari': ['Rajbiraj', 'Kanchanrup', 'Bodebarsain', 'Hanumannagar', 'Dakneshwari'],
  'Siraha': ['Lahan', 'Mirchaiya', 'Golbazaar', 'Dhangadhi', 'Aurahi'],
  'Dhanusha': ['Janakpur', 'Dharmapur', 'Ganeshman Charnath', 'Bideha', 'Mithila'],
  'Mahottari': ['Jaleshwar', 'Gaushala', 'Bardibas', 'Matihani', 'Manraja'],
  'Sarlahi': ['Malangawa', 'Haripur', 'Balara', 'Basbariya', 'Barahathwa'],
  'Rautahat': ['Gaur', 'Chandrapur', 'Garuda', 'Dewahi Gonahi', 'Brindaban'],
  'Bara': ['Kalaiya', 'Parwanipur', 'Jeetpur Simara', 'Nijgadh'],
  'Parsa': ['Birgunj', 'Pokhariya', 'Thori', 'Bindabasini'],
  'Dolakha': ['Bhimeshwar', 'Charikot', 'Gaurishankar'],
  'Ramechhap': ['Manthali', 'Ramechhap', 'Likhu Tamakoshi'],
  'Sindhuli': ['Kamalamai', 'Dudhauli', 'Hariharpurgadhi'],
  'Kathmandu': ['Kathmandu', 'Kageshwari Manohara', 'Gokarneshwar', 'Nagarjun'],
  'Lalitpur': ['Patan', 'Mahalaxmi', 'Godawari', 'Lalitpur'],
  'Bhaktapur': ['Bhaktapur', 'Changunarayan', 'Madhyapur Thimi', 'Suryabinayak'],
  'Kavrepalanchok': ['Dhulikhel', 'Banepa', 'Panauti'],
  'Sindhupalchok': ['Chautara', 'Melamchi', 'Indrawati'],
  'Nuwakot': ['Bidur', 'Belkot', 'Kakani'],
  'Rasuwa': ['Dhunche', 'Gosaikunda'],
  'Dhading': ['Dhading', 'Nilkantha', 'Benighat', 'Gajuri'],
  'Makwanpur': ['Hetauda', 'Thaha', 'Raksirang'],
  'Chitwan': ['Bharatpur', 'Khairahani', 'Ratnanagar', 'Madi'],
  'Gorkha': ['Gorkha', 'Palungtar', 'Bharatpokhari'],
  'Lamjung': ['Besisahar', 'Madhya Nepal', 'Rainas'],
  'Tanahun': ['Bhimad', 'Byas', 'Bandipur'],
  'Syangja': ['Bhirkot', 'Chapakot', 'Waling'],
  'Kaski': ['Pokhara', 'Lekhnath'],
  'Manang': ['Chame', 'Narphu'],
  'Mustang': ['Gharpajhong', 'Thasang', 'Gharapjhong'],
  'Myagdi': ['Beni', 'Annapurna', 'Malika'],
  'Parbat': ['Kusma', 'Phalewas'],
  'Baglung': ['Baglung', 'Badigad'],
  'Gulmi': ['Tamghas', 'Musikot', 'Isma'],
  'Palpa': ['Tansen', 'Ribdikot'],
  'Nawalparasi': ['Bhairahawa', 'Ramgram', 'Gaidakot'],
  'Rupandehi': ['Siddharthanagar', 'Butwal', 'Devdaha'],
  'Kapilvastu': ['Taulihawa', 'Kapilvastu'],
  'Arghakhanchi': ['Sandhikharka', 'Bhumikasthan'],
  'Pyuthan': ['Pyuthan', 'Sworgadwari'],
  'Rolpa': ['Liwang', 'Rolpa', 'Runtigadhi'],
  'Rukum': ['Musikot', 'Chaurjahari'],
  'Salyan': ['Salyan', 'Sharada', 'Kapurkot'],
  'Dang': ['Ghorahi', 'Tulsipur'],
  'Banke': ['Nepalgunj', 'Kohalpur'],
  'Bardiya': ['Gulariya', 'Madhuban'],
  'Surkhet': ['Birendranagar', 'Bheriganga'],
  'Dailekh': ['Narayan', 'Dailekh'],
  'Jajarkot': ['Jajarkot', 'Barekot'],
  'Dolpa': ['Dunai', 'Thuli Bheri'],
  'Jumla': ['Chandannath', 'Jumla'],
  'Kalikot': ['Manma', 'Kalikot'],
  'Mugu': ['Gamgadhi', 'Chhayanath Rara'],
  'Humla': ['Simikot', 'Kharpunath'],
  'Bajura': ['Martadi', 'Budhinanda'],
  'Bajhang': ['Chainpur', 'Jaya Prithvi'],
  'Achham': ['Mangalsen', 'Kamalbazar'],
  'Doti': ['Dipayal Silgadhi', 'Silgadhi'],
  'Kailali': ['Dhangadhi', 'Tikapur'],
  'Kanchanpur': ['Bhimdatta', 'Mahakali'],
};


export const DistrictsOption = [
  { value: 'achham', label: 'Achham' },
  { value: 'arghakhanchi', label: 'Arghakhanchi' },
  { value: 'baglung', label: 'Baglung' },
  { value: 'baitadi', label: 'Baitadi' },
  { value: 'bajhang', label: 'Bajhang' },
  { value: 'bajura', label: 'Bajura' },
  { value: 'banke', label: 'Banke' },
  { value: 'bara', label: 'Bara' },
  { value: 'bardiya', label: 'Bardiya' },
  { value: 'bhaktapur', label: 'Bhaktapur' },
  { value: 'bhojpur', label: 'Bhojpur' },
  { value: 'chitwan', label: 'Chitwan' },
  { value: 'dadeldhura', label: 'Dadeldhura' },
  { value: 'dailekh', label: 'Dailekh' },
  { value: 'dang deukhuri', label: 'Dang Deukhuri' },
  { value: 'darchula', label: 'Darchula' },
  { value: 'dhading', label: 'Dhading' },
  { value: 'dhankuta', label: 'Dhankuta' },
  { value: 'dhanusa', label: 'Dhanusa' },
  { value: 'dholkha', label: 'Dholkha' },
  { value: 'dolpa', label: 'Dolpa' },
  { value: 'doti', label: 'Doti' },
  { value: 'gorkha', label: 'Gorkha' },
  { value: 'gulmi', label: 'Gulmi' },
  { value: 'humla', label: 'Humla' },
  { value: 'ilam', label: 'Ilam' },
  { value: 'jajarkot', label: 'Jajarkot' },
  { value: 'jhapa', label: 'Jhapa' },
  { value: 'jumla', label: 'Jumla' },
  { value: 'kailali', label: 'Kailali' },
  { value: 'kalikot', label: 'Kalikot' },
  { value: 'kanchanpur', label: 'Kanchanpur' },
  { value: 'kapilvastu', label: 'Kapilvastu' },
  { value: 'kaski', label: 'Kaski' },
  { value: 'kathmandu', label: 'Kathmandu' },
  { value: 'kavrepalanchok', label: 'Kavrepalanchok' },
  { value: 'khotang', label: 'Khotang' },
  { value: 'lalitpur', label: 'Lalitpur' },
  { value: 'lamjung', label: 'Lamjung' },
  { value: 'mahottari', label: 'Mahottari' },
  { value: 'makwanpur', label: 'Makwanpur' },
  { value: 'manang', label: 'Manang' },
  { value: 'morang', label: 'Morang' },
  { value: 'mugu', label: 'Mugu' },
  { value: 'mustang', label: 'Mustang' },
  { value: 'myagdi', label: 'Myagdi' },
  { value: 'nawalparasi', label: 'Nawalparasi' },
  { value: 'nuwakot', label: 'Nuwakot' },
  { value: 'okhaldhunga', label: 'Okhaldhunga' },
  { value: 'palpa', label: 'Palpa' },
  { value: 'panchthar', label: 'Panchthar' },
  { value: 'parbat', label: 'Parbat' },
  { value: 'parsa', label: 'Parsa' },
  { value: 'pyuthan', label: 'Pyuthan' },
  { value: 'ramechhap', label: 'Ramechhap' },
  { value: 'rasuwa', label: 'Rasuwa' },
  { value: 'rautahat', label: 'Rautahat' },
  { value: 'rolpa', label: 'Rolpa' },
  { value: 'rukum', label: 'Rukum' },
  { value: 'rupandehi', label: 'Rupandehi' },
  { value: 'salyan', label: 'Salyan' },
  { value: 'sankhuwasabha', label: 'Sankhuwasabha' },
  { value: 'saptari', label: 'Saptari' },
  { value: 'sarlahi', label: 'Sarlahi' },
  { value: 'sindhuli', label: 'Sindhuli' },
  { value: 'sindhupalchok', label: 'Sindhupalchok' },
  { value: 'siraha', label: 'Siraha' },
  { value: 'solukhumbu', label: 'Solukhumbu' },
  { value: 'sunsari', label: 'Sunsari' },
  { value: 'surkhet', label: 'Surkhet' },
  { value: 'syangja', label: 'Syangja' },
  { value: 'tanahu', label: 'Tanahu' },
  { value: 'taplejung', label: 'Taplejung' },
  { value: 'terhathum', label: 'Terhathum' },
  { value: 'udayapur', label: 'Udayapur' }
];

export const ReligionOption = [
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Buddhism', label: 'Buddhism' },
  { value: 'Islam', label: 'Islam' },
  { value: 'Kirat', label: 'Kirat' },
  { value: 'Christianity', label: 'Christianity' },
  { value: 'Prakriti', label: 'Prakriti' },
  { value: 'Bon', label: 'Bon' },
  { value: 'Jainism', label: 'Jainism' },
  { value: 'Bahai', label: 'Bahai' },
  { value: 'Sikhism', label: 'Sikhism' }
];
export const ChildPersonalHistoryOption = [
  { label: 'Veg / शाकाहारी', value: 'Veg' },
  { label: 'Sleeping Well / राम्रो निद्रा', value: 'Sleeping Well' },
  { label: 'Bowel & Bladder/ आन्द्रा र मूत्राशय', value: 'Bowel&Bladder' },
  { label: 'Allergies / एलर्जी', value: 'Allergies' }
];
export const PersonalHistoryOption = [
  ...ChildPersonalHistoryOption,
  { label: 'Smoker / धुम्रपान', value: 'Smoker' },
  { label: 'Alcoholics / मदिरा सेवन', value: 'Alcoholics' }
];
export const ExceedOption = [
  { label: 'Feeling to cut down drinking.', value: '1' },
  { label: 'Annoyed by critisizing of Drinking', value: '2' },
  { label: 'Guilt after drinking.', value: '3' },
  { label: 'Eye Opener', value: '4' }
];
export const ContraceptionTypeOption = [
  { label: 'Barier', value: 'Barier' },
  { label: 'Pills (POP / COCP)', value: 'Pills' },
  { label: 'Depo Injection', value: 'DepoInjection' },
  { label: 'Implant', value: 'Implant' },
  { label: 'Copper-T', value: 'CopperT' },
  { label: 'Permanent', value: 'Permanent' }
];
export const NeuroticSymptomsOption = [
  { label: 'Thumb Biting', value: 'Thumb Biting' },
  { label: 'Nail Biting', value: 'Nail Biting' },
  { label: 'Head Banging', value: 'Head Banging' },
];
export const GeneralAppearanceOption = [
  { label: 'Well Oriented to time, place & person', value: 'WellOriented' },
  { label: 'In Pain', value: 'InPain' }
];

export const PilccodOption = [
  { label: 'Pallor / प्यालर', value: 'Pallor' },
  { label: 'Icterus / ईकटेरस', value: 'Icterus' },
  { label: 'Lyimphadenopathy / लिम्फेडेनोपैथी', value: 'Lyimphadenopathy' },
  { label: 'Clubbing / क्लबिङ', value: 'Clubbing' },
  { label: 'Cyanosis / साइनोसिस', value: 'Cynaosis' },
  { label: 'Oedema / एडेमा', value: 'Oedema' },
  { label: 'Dehydration / डिहाइड्रेसन', value: 'Dehydration' }
];
export const RelationOption = [
  { label: 'Grand Father', value: 'GrandFather' },
  { label: 'Grand Mother', value: 'GrandMother' },
  { label: 'Father', value: 'Father' },
  { label: 'Uncle', value: 'Uncle' },
  { label: 'Aunt', value: 'Aunt' },
  { label: 'Mother', value: 'Mother' },
  { label: 'Son', value: 'Son' },
  { label: 'Daughter', value: 'Daughter' },
  { label: 'Brother', value: 'Brother' },
  { label: 'Sister', value: 'Sister' }
];
export const FamilyHistoryOption = [
  { label: 'History of similar illness in family.', value: 'History of similar illness' },
  { label: 'History of Diabetes in family.', value: 'History of Diabetes' },
  { label: 'History of Hypertension', value: 'History of Hypertension' },
  { label: 'History of TB in Family', value: 'History of TB' }
];
export const PsychiatryFamilyHistoryOption = [
  { label: 'History of similar illness in family.', value: 'History of similar illness' },
  { label: 'Alcohoic Abuse', value: 'Alcohoic Abuse' },
  { label: 'Drug Abuse', value: 'Drug Abuse' },
  { label: 'Any Family Streess', value: 'Any Family Streess' },
  { label: 'Family History of diasppearance or out of contact', value: 'Family History of diasppearance or out of contact' }
];
export const MONTH_SELECT = [
  {
    value: '01',
    label: 'January'
  },
  {
    value: '02',
    label: 'February'
  },
  {
    value: '03',
    label: 'March'
  },
  {
    value: '04',
    label: 'April'
  },
  {
    value: '05',
    label: 'May'
  },
  {
    value: '06',
    label: 'June'
  },
  {
    value: '07',
    label: 'July'
  },
  {
    value: '08',
    label: 'August'
  },
  {
    value: '09',
    label: 'September'
  },
  {
    value: '10',
    label: 'October'
  },
  {
    value: '11',
    label: 'November'
  },
  {
    value: '12',
    label: 'December'
  }
];

export const SelectScaleType = [
  { label: '°F', value: 'fahrenheit' },
  { label: '°C', value: 'celcius' }
];
const lastWeek = dayjs().subtract(7, 'day');
const startOfLastWeek = lastWeek.startOf('week');
const endOfLastWeek = lastWeek.endOf('week');

export const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: 'Today', value: [dayjs(), dayjs()] },
  { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
  {
    label: 'This Week',
    value: [dayjs().startOf('week'), dayjs().endOf('week')]
  },
  { label: 'Last Week', value: [startOfLastWeek, endOfLastWeek] },
  { label: 'Past Two Month', value: [dayjs().subtract(2, 'month'), dayjs()] },
  {
    label: 'This Month',
    value: [dayjs().startOf('month'), dayjs().endOf('month')]
  },
  {
    label: 'This Year',
    value: [dayjs().startOf('year'), dayjs().endOf('year')]
  },
  {
    label: 'Last Year',
    value: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
  }
];

export const addressOptions = (addressData: any, key: string) => {
  return (
    addressData?.[key]?.map((data: any) => ({
      label: data.name,
      value: data.id
    })) || []
  );
};

export const getAddressOption = (addressData: any) => {
  const provinceOption = addressOptions(addressData, 'province');
  const districtOption = addressOptions(addressData, 'district');
  const municipalityOption = addressOptions(addressData, 'municipality');

  return { provinceOption, districtOption, municipalityOption };
};

export const AppointmentCommonColumns: ColumnsType<any> = [
  {
    title: 'Patient Name',
    key: 'first_name',
    render: (_, record) => {
      return (
        <div className="semi-bold">
          {record?.patient?.first_name} {record?.patient?.last_name}
        </div>
      );
    }
  },
  {
    title: 'Appointment Date',
    dataIndex: 'appointment_date',
    key: 'appointment_date',
    render: text => {
      return <div className="semi-bold">{text}</div>;
    }
  },
  {
    title: 'Appointment Time',
    dataIndex: 'appointment_time',
    key: 'appointment_time',
    render: text => <div>{text}</div>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    // render: text => <Tag color={Colors.ALGAE_GREEN}>{text}</Tag>
    render: text => {
      const priorityStyle = {
        background: text === 'QUERIED' ? 'orange' : 'green',
        color: 'white',
        padding: '2px 5px',
        borderRadius: '5px'
      };
      return <span style={priorityStyle}>{text}</span>;
    }
  },
  {
    title: 'Contact Number',
    key: 'contact_number',
    render: (_, record) => {
      return <div className="semi-bold">{record?.patient?.contact_number}</div>;
    }
  }
];

export const SanitationOption = [
  { label: 'Good', value: 'Good' },
  { label: 'Worse', value: 'Worse' }
];
export const WaterConsumptionOption = [
  { label: 'Purified', value: 'Purified' },
  { label: 'Unpurified', value: 'Unpurified' }
];
export const CommonResponseSelectOption = [
  { label: 'Intact', value: 'INTACT' },
  { label: 'Impared', value: 'IMPARED' }
];
export const CharacterOption = [
  { label: 'Negative (shy/rigid/neutral)', value: 'Negative' },
  { label: 'Positive (confident/puntual)', value: 'Positive' }
];
export const AppearanceOption = [
  { label: 'Normal', value: 'Normal' },
  { label: 'Not Well Groomed /Poor Hygine', value: 'Not Well Groomed /Poor Hygine' }
];
export const BehaviourOption = [
  { label: 'Normal', value: 'Normal' },
  { label: 'Aggressive', value: 'Aggressive' },
  { label: 'Less Eye Contact', value: 'Less Eye Contact' },
  { label: 'Incooperative', value: 'Incooperative' }
];
export const FundoscopyOption = [
  { label: 'Normal', value: 'Normal' },
  { label: 'Abnormal', value: 'Abnormal' }
];
export const NystagmusOption = [
  { label: 'Present', value: 'PRESENT' },
  { label: 'Absent', value: 'ABSENT' }
];
export const EmotionalStateOption = [
  { label: 'Depressed', value: 'Depressed' },
  { label: 'Anxious', value: 'Anxious' },
  { label: 'Euphoric', value: 'Euphoric' }
];
export const PerceptionOption = [
  { label: 'Illusion', value: 'Illusion' },
  { label: 'Hallucination', value: 'Hallucination' },
  { label: 'Depersonalization', value: 'Depersonalization' },
  { label: 'Derealization', value: 'Derealization' },

];
export const MoodAffectOption = [
  { label: 'Concurency', value: 'Concurency' },
  { label: 'Appropriate to Situation', value: 'Appropriate to Situation' },
  { label: 'Appropriate to Thoughts', value: 'Appropriate to Thoughts' }
];
export const ThoughtsContentOption = [
  { label: 'Illusion', value: 'Illusion' },
  { label: 'Dillusion', value: 'Dillusion' },
  { label: 'Social Thoughts', value: 'Social Thoughts' },
  { label: 'HomecidalThoughts', value: 'HomecidalThoughts' },
];
export const MemoryStateOption = [
  { label: 'Immediate Memory', value: 'Immediate Memory' },
  { label: 'Remote Memory', value: 'Remote Memory' },
  { label: 'Past Memory', value: 'Past Memory' }
];

export const MeningitisSignOption = [
  { label: 'Kernig Sign', value: 'Kernig Sign' },
  { label: 'Brudzinski Sign', value: 'Brudzinski Sign' },
  { label: 'Neck Stiffness', value: 'Neck Stiffness' },
];


export const EyeMovementCheckOption = [
  {label:'Ptosis', value:'ptosis'},
  {label:'Sqint', value:'Sqint'}
]
export const MusclesBulkOption =[
  {label:'Atrophy', value:'Atrophy'},
  {label:'Normal', value:'Normal'},
  {label:'Hypertrophy', value:'Hypertrohy'}
]
export const MotorFunctionToneOption =[
  {label:'Hypotonic', value:'Hypotonic'},
  {label:'Normal', value:'Normal'},
  {label:'Hypertonic', value:'Hypertonic'}
]
export const YesNoOption = [
  {label:'Yes', value:1},
  {label:'No', value:0},
]
export const PowerRatingOption = [
  {label:'0/5 - No Movement' , value:'O - No Movement'},
  {label:'1/5 - Flicker of movement' , value:'1 - Flicker of movement'},
  {label:'2 - Can move with gravity removed' , value:'2 - Can move with gravity removed'},
  {label:'3 - Can overcome gravity but not any resistance' , value:'3 - Can overcome gravity but not any resistance'},
  {label:'4 - Can overcome some resistance but not full power' , value:'4 - Can overcome some resistance but not full power'},
  {label:'5 - Full Power' , value:'5 - Full Power'},
]
export const DTRoption = [
  {label:'0  Absent (Aewflexia)', value:'0'},
  {label:'1+ Diminished (Hyporeflexia)', value:'1+'},
  {label:'2+ Normal response', value:'2+'},
  {label:'3+ Exaggrated (Brisk)', value:'3+'},
  {label:'3+ Very Brisk, hyperactivr with clonis', value:'4+'},
]

export const HematologyTestOption = [
  { label: 'CBC', value:'CBC' },
  { label: 'WBC', value: 'WBC' },
  { label: 'RBC', value: 'RBC' },
  { label: 'MCV', value: 'MCV' },
  { label: 'MCH', value: 'MCH' },
  { label: 'MCHC', value: 'MCHC' },
  { label: 'PLATELETS', value: 'PLATELETS' },
  { label: 'DLC', value: 'DLC' },
  { label: 'ESR', value: 'ESR' },
  { label: 'BT/CT', value: 'BT/CT' },
  { label: 'PT', value: 'PT' },
  { label: 'APTT', value: 'APTT' },
  { label: 'PERIPHERAL BLOOD SMEAR', value: 'PERIPHERAL BLOOD SMEAR' },
];

export const MicrobiologyTestOption = [
  {label:'BLOOD C/S', value:'BLOOD C/S'},
  {label:'URINE C/S', value:'URINE C/S'},
  {label:'STOOL C/S', value:'STOOL C/S'},
  {label:'SPUTUM C/S', value:'SPUTUM C/S'},
  {label:'GRAM STAIN', value:'GRAM STAIN'},
  {label:'KOH PREPARATION', value:'KOH PREPARATION'},
  {label:'FUNGAL C/S', value:'FUNGAL C/S'},
  {label:'BODY FLUID C/S', value:'BODY FLUID C/S'},
]
export const PathologyTestOption = [
  {label:'URINE RE/ME', value:'URINE RE/ME'},
  {label:'URINE ACETONE', value:'URINE ACETONE'},
]
export const BioChemistryTestOption = [
  { label: 'FASTING GLUCOSE', value: 'FASTING GLUCOSE' },
  { label: 'RANDOM GLUCOSE', value: 'RANDOM GLUCOSE' },
  { label: 'GCT', value: 'GCT' },
  { label: 'OGTT', value: 'OGTT' },
  { label: 'HBA1C', value: 'HBA1C' },
  { label: 'UREA', value: 'UREA' },
  { label: 'CREATININE', value: 'CREATININE' },
  { label: 'SODIUM', value: 'SODIUM' },
  { label: 'POTASSIUM', value: 'POTASSIUM' },
  { label: 'TOTAL CHOLESTEROL', value: 'TOTAL CHOLESTEROL' },
  { label: 'HDL', value: 'HDL' },
  { label: 'LDL', value: 'LDL' },
  { label: 'TG', value: 'TG' },
  { label: 'BILIRUBIN, TOTAL', value: 'BILIRUBIN, TOTAL' },
  { label: 'BILIRUBIN, DIRECT', value: 'BILIRUBIN, DIRECT' },
  { label: 'TOTAL PROTEIN', value: 'TOTAL PROTEIN' },
  { label: 'ALBUMIN', value: 'ALBUMIN' },
  { label: 'AST', value: 'AST' },
  { label: 'ALT', value: 'ALT' },
  { label: 'GGT', value: 'GGT' },
  { label: 'ALP', value: 'ALP' },
  { label: 'LDH', value: 'LDH' },
  { label: 'CPKMB', value: 'CPKMB' },
  { label: 'CPK TOTAL', value: 'CPK TOTAL' },
  { label: 'TROPONIN I', value: 'TROPONIN I' },
  { label: 'AMYLASE', value: 'AMYLASE' },
  { label: 'LIPASE', value: 'LIPASE' },
  { label: 'TFT ( FT3/FT4/TSH)', value: 'TFT ( FT3/FT4/TSH)' },
];

export const PhysiometryTestOption = [
  {label:'ECG' , value:'ECG'},
  {label:'ECHO' , value:'ECHO'},
]
export const InsightsOption = [
  {label:'A - Complete Denial' , value:'A - Complete Denial'},
  {label:'B - Slight Awareness , denial at sometime' , value:'B - Slight Awareness , denial at sometime'},
  {label:'C - Awareness of being sick but attribute to external factors' , value:'C - Awareness of being sick but attribute to external factors'},
  {label:'D - Awareness of being sick with unknown factors' , value:'D - Awareness of being sick with unknown factors'},
  {label:'E - True insight & want to change behaviour ' , value:'E - True insight & want to change behaviour '},
]
export const RadiologyTestOption = [
  {label:'X-ray' , value:'X-ray'},
  {label:'USG' , value:'USG'},
]
export const FollowUpConditionOption = [
  {label:'Improving/Subsided' , value:'Subsided'},
  {label:'Not Improving' , value:'Not Improving'}
]
