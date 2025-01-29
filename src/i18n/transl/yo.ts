import { Translations } from './en';

export default {
  appVersion: {
    newVersion: 'A new version of Coldtivate is available!', // TODO
    pleaseUpdate: 'Please update app before continuing.', // TODO
  },
  languages: {
    current: 'Geesi',
    label: 'Ede',
    options: {
      en: 'Geesi',
      hi: 'ede india',
      or: 'Oriya',
      gu: 'ede Gujarati',
      fr: 'Faranse',
      pt: 'Portuguese',
      ig: 'Igbo', // TODO
      yo: 'Yoruba', // TODO
      ha: 'Hausa', // TODO
    },
  },
  gender: { female: 'abo', male: 'Akọ', other: 'Omiiran' },
  navigation: {
    error: {
      errorMessage: 'Yeee... dabi ẹni pe ohun kan ti ko tọ.',
      tryAgainMessage: 'Jọwọ gbiyanju lẹẹkansi nigbamii.',
    },
    auth: {
      SignIn: 'Wo ile',
      SignUp: 'Forukọsilẹ',
      ForgotPassword: 'Gbagbe ọrọ igbaniwọle bi',
      PasswordReset: 'tun to',
      AppInfo: 'Alaye app',
      Logout: 'Jade kuro lori ero ayelujara',
    },
    management: {
      Root: 'Isakoso',
      CompanyDetails: 'Awọn alaye Ile-iṣẹ',
      RevenueAnalysis: 'Ayẹwo owo to wọle',
      UsageAnalysis: 'Ayẹwo lilo',
      Locations: 'Awọn agbe gbe',
      AddLocation: 'Fi agbe gbe kun',
      EditLocation: 'Ṣatunkọ agbe gbe',
      CoolingUnits: 'Awọn ohun imu itutu',
      DisabledCoolingUnitsDescription: 'Fi o kere tan agbe gbe kan kun.',
      CoolingUsers: 'olumulo itutu',
      AddCoolingUser: 'Ṣafikun olumulo Itutu',
      EditCoolingUser: 'Ṣatunkọ olumulo itutu',
      AddCoolingUnit: 'Ṣafikun ẹka kan Itutu',
      EditCoolingUnit: 'Ṣatunkọ ẹka kan itutu',
      Operators: 'Awọn oniṣẹ',
      AddOperator: 'fi awọn onise kun',
      EditOperator: 'se atunko oniṣẹ',
      RegisteredEmployee: 'Oṣiṣẹ ti o forukọsilẹ',
      AddRegisteredEmployee: 'Ṣafikun Oṣiṣẹ ti o forukọsilẹ',
      RegisteredEmployeeDetails: 'Akosile awọn osise ti o forukọsilẹ',
      DeliveryContacts: 'Delivery Contacts', // TODO
      AddUserBankAccount: '{{user}} Bank Account', // TODO
    },
    bottomTabs: {
      RootMainTabStack: 'Coldtivate ti {{firstName}}',
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'Awọn eto ibi-ọja',
      PriceTrend: 'Aṣa idiyele',
      PriceRanking: 'ipo owo',
      Planner: 'Alakoso',
      RoomConditions: 'ipo awọn yara',
      CratesInfo: 'alaye kireeti',
      Dashboard: 'Dasibodu',
      History: 'Itan',
      MarketPrice: 'Iye Oja',
      CoolingUnits: 'Awọn ohun imu itutu',
      Analytics: 'Atupale',
      CheckIn: 'Wole sinu',
      CheckOut: 'jade',
      Maps: 'MAAPU',
    },
    dashboard: {
      AccountDetails: 'Awọn alaye akanti',
      PersonalDetails: 'Awọn alaye ti ara ẹni',
      LocalizationPreferences: 'Awọn ayanfẹ agbegbe',
      ContactsSharing: 'Pipin awọn olubasọrọ',
      Coupons: 'Awọn kupọọnu',
      CouponsActiveTab: 'Ti nṣiṣe lọwọ',
      CouponsRevokedTab: 'Fagilee',
      Marketplace: 'Ibi ọja',
      MarketplaceFilters: 'Ajọ',
      MarketplaceAllTab: 'Gbogbo',
      MarketplaceFavoritesTab: 'Awọn ayanfẹ',
      Orders: 'Awọn ibere',
      MyOrders: 'Awọn aṣẹ Mi',
      MySales: 'My Sales', // TODO
      OrderDetails: '{{orderCode}}',
      KnowledgeHub: 'Ibudo Imọ',
      QuitTutorial: 'fi eko kiko sile',
      FAQ: 'Awon ibeere ti awon eniyan saaba ma n beere',
      About: 'Nipa',
      Management: 'Isakoso',
      Tutorial: 'Ikẹkọ',
      PayoutOptions: 'Awọn aṣayan isanwo',
      PaymentMethods: 'Awọn ọna isanwo',
      Wallet: 'Apamọwọ',
      Transactions: 'Awọn iṣowo',
      Transaction: '{{id}}',
      ShoppingCart: 'Shopping Cart', // TODO
    },
    checkIn: {
      SelectCropType: 'se asayan irufe irugbin',
      CheckIn: 'wole',
      CropList: '{{cropType}}',
      CrateSetup: 'wole',
      CrateWeightAndPricing: 'Ìwọn àti owó àpótí',
    },
    about: {
      comsolAgreement: 'COMSOL Adehun Iwe-aṣẹ akoko ṣiṣe 6.0',
      userLicense: 'Adehun Iwe-aṣẹ Olumulo Ipari',
      aboutComsol: 'Nipa COMSOL',
      privacyPolicy: 'Asiri Afihan',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: 'Iwadi ọja fun {{farmer}}',
      BaseSurvey: 'iwadi olumulo Itutu',
    },
    analytics: { methodology: 'Ilana' },
  },
  actions: {
    error: 'Asise ti waye',
    cancel: 'Fagilee',
    confirm: 'fi o n te lu',
    import: 'gbe wọle',
    yes: 'Bẹẹni',
    no: 'Rara',
    select: 'Yan',
    close: 'pade',
    delete: 'Paarẹ',
    ok: 'O dara',
    all: 'Gbogbo',
    none: 'Ko si',
    next: 'eyi ti o kan',
    back: 'Pada',
    search: 'Wa…',
    or: 'tabi',
    add: 'fi`kun',
    edit: 'se atunko',
    go: 'lo',
    done: 'Ti ṣe',
    'not-available': 'Kò sí',
    'complete-later': 'Pari nigbamii',
    'update-success': 'Ti ni aṣeyọri imudojuiwọn',
    'save-changes': 'Fi awọn ayipada pamọ',
    save: 'Fipamọ',
    continue: 'tesiwaju',
    update: 'update', // TODO
    clearAll: 'Clear all', // TODO
    apply: 'Apply', // TODO
  },
  components: {
    datePicker: {
      heading: 'Select a date', // TODO
      clearButtonLabel: 'Ko o',
      confirmButtonLabel: 'fi o n te lu',
      placeholder: 'Ọjọ́/Oṣù/Ọdún',
      startDateSelection: 'Yan ọjọ ibẹrẹ:',
      endDateSelection: 'Yan ọjọ ipari:',
      startDateError: 'Ọjọ ibẹrẹ ko le pẹ ju ọjọ ipari lọ.',
      endDateError: 'Ọjọ ipari ko le ṣaaju ọjọ ibẹrẹ.',
    },
  },
  Auth: {
    welcomePopup:
      "Kaabo si Coldtivate! Ti o ba jẹ agbẹ, oniṣowo kan, tabi ti o nifẹ si rira ọja ti o fipamọ sinu awọn yara tutu, jọwọ forukọsilẹ nipa tite “Forukọsilẹ bi olumulo itutu agbaiye tabi olura”. Ti o ba ṣiṣẹ fun ile-iṣẹ itutu agbaiye, jọwọ kan si oniduro rẹ lati ṣayẹwo boya ile-iṣẹ rẹ ti forukọsilẹ. Ti o ba jẹ bẹ, oniduro rẹ yẹ ki o fi ifiwepe SMS ranṣẹ si ọ lati forukọsilẹ bi oṣiṣẹ ti o forukọsilẹ tabi bi oniṣẹ. Ti kii ba ṣe bẹ, o le forukọsilẹ ile-iṣẹ, ati forukọsilẹ bi oṣiṣẹ ti o forukọsilẹ. Jọwọ ṣayẹwo apakan 'Alaye App' fun awọn FAQs.",
    Root: {
      welcome: 'Kaabo si Coldtivate.',
      signIn: 'wọle',
      signUpCompany: 'Forukọsilẹ bi ile-iṣẹ',
      signUpCoolingUser: 'Forukọsilẹ bi Olumulo Itutu tabi Olura',
      appInfo: 'Alaye app',
    },
    SignIn: {
      heading: 'wọle',
      accounts: {
        registeredEmployee: {
          label: 'Oṣiṣẹ ti o forukọsilẹ',
          description:
            'lara olusakoso ti olupese yara itutu. Oṣiṣẹ ti o forukọsilẹ le forukọsilẹ ile-iṣẹ sile lori app ki o pe awọn oṣiṣẹ miiran lati darapọ mọ. Awọn oṣiṣẹ ti o forukọsilẹ le wọle pẹlu imeeli tabi nọmba foonu.',
        },
        operator: {
          label: 'oniṣẹ',
          description:
            'osise ti ara wa ni yara tutu o si n dari bi jijade ati iwole se n sele. A le pe awọn amujo ero nipasẹ awọn oṣiṣẹ ti o forukọsilẹ lati darapọ mọ ile-iṣẹ naa. Awọn oniṣẹ le wọle pẹlu nọmba foonu kan.',
        },
        coolingUser: {
          label: 'olumulo itutu',
          description:
            'Awọn tutu yara olumulo ati olumulo. Awọn agbe, awọn oniṣowo, awọn alatuta ti o ni iwọle si foonuiyara le wọle si ibi. Awọn olumulo yara tutu laisi foonuiyara le wọle si alaye ti app nipa lilo si yara tutu kan ati ibaraenisọrọ pẹlu oniṣẹ ẹrọ. Awọn olura le wọle si ibi lati pari awọn rira.',
        },
        toasts: {
          login:
            'Orukọ olumulo tabi ọrọ igbaniwọle ko pe. Jọwọ jẹrisi pe o ti yan ipa olumulo to tọ',
          success: 'Ti ni aṣeyọri wiwọle',
        },
      },
      form: {
        user: {
          placeholder: 'Imeeli / Nọmba foonu',
          description: {
            default: 'Jọwọ pese nọmba foonu to wulo (pẹlu koodu orilẹ-ede).',
            registeredEmployee: 'Jọwọ pese imeeli tabi nọmba foonu to wulo (pẹlu koodu orilẹ-ede).',
          },
          messages: {
            default: 'Nọmba foonu ti wa ni ti beere.',
            registeredEmployee: 'Adirẹsi imeeli tabi nọmba foonu kan nilo.',
          },
        },
        password: { placeholder: 'oro-iwole', messages: { required: 'O  nilo Ọrọigbaniwọle' } },
        actions: { logIn: 'Wo ile' },
      },
    },
    SignUp: {
      select: { header: 'Yan {{fieldName}} kan', label: 'Wa…', cancel: 'Fagilee', ok: 'O dara' },
      welcome: 'Kaabo si Coldtivate.',
      schema: {
        passwordError:
          'Ọrọigbaniwọle rẹ nilo lati jẹ o kere ju awọn lẹta 8 gun, ni awọn lẹta nla kan ati awọn lẹta kekere kan ninu, ati nọmba kan.',
        confirmPasswordError: 'Ijẹrisi ọrọ igbaniwọle jẹ dandan.',
        passwordsMismatchError: 'Awọn ọrọigbaniwọle ko baramu.',
        countryError: 'Aṣayan orilẹ-ede jẹ dandan.',
        firstNameError: 'Orukọ akọkọ jẹ dandan.',
        lastNameError: 'Orukọ idile jẹ dandan.',
        phoneError: 'Nọmba foonu jẹ dandan.',
        invalidPhoneError: 'Nọmba foonu ko wulo',
        languageError: 'Ede jẹ dandan.',
        genderError: 'Yiyan akọ tabi abo jẹ dandan.',
        termsError: 'O nilo lati gba si Awọn ofin lilo.',
        companyError: 'Orukọ Ile-iṣẹ jẹ dandan.',
        currencyError: 'Aṣayan owo jẹ dandan.',
        emailError: 'Imeeli jẹ dandan.',
        malformedEmailError: 'Imeeli ti ko tọ.',
      },
      commonForm: {
        firstNameLabel: 'Orukọ akọkọ',
        lastNameLabel: 'Oruko idile',
        phoneLabel: 'Nọmba foonu (pẹlu koodu orilẹ-ede)',
        passwordLabel: 'oro-iwole',
        confirmPasswordLabel: 'Jẹrisi ọrọ igbaniwọle',
        countryFieldName: 'Orilẹ-ede',
        genderFieldName: 'Akọ abi abo',
        submit: 'Forukọsilẹ',
        terms: {
          agree: 'Mo gba lati Coldtivate',
          license: 'Adehun iwe-aṣẹ olumulo',
          privacy: 'ikoko Ilana',
          and: 'ati',
          comsol: 'COMSOL Awọn ofin lilo',
        },
      },
      SignUpCompany: {
        companyHeader: 'Wọlé Up Company',
        userHeader: 'Forukọsilẹ Oṣiṣẹ ti o forukọsilẹ',
        companyNameLabel: 'Orukọ Ile-iṣẹ',
        emailLabel: 'Imeeli',
        currencyFieldName: 'iru Owo',
        modal: {
          warning: 'Ti o ba forukọsilẹ laisi foonu diẹ ninu awọn iṣẹ ṣiṣe kii yoo ṣiṣẹ:',
          reasons: { '1': 'Ti n se atunto akanti', '2': 'N gba aridaju ateranse' },
          buttons: { continue: 'Tesiwaju lonakona', addPhone: 'Fi foonu kun' },
        },
      },
      SignUpCoolingUser: {
        header: 'Forukọsilẹ bi Olumulo Itutu tabi Olura',
        languageFieldName: 'Ede',
      },
      toasts: {
        error:
          'Please ensure your details are accurate and try again. Note that one phone number and email can only be used by one account.', // TODO
      },
    },
    ForgotPassword: {
      heading: 'Gbagbe ọrọ igbaniwọle bi',
      messageSentNotification:
        'Ti nọmba foonu ba wa, a ti fi SMS ranṣẹ lati tun ọrọ igbaniwọle rẹ to.',
      instructions:
        'Lati le tun ọrọ igbaniwọle rẹ pada, jọwọ tẹ nọmba foonu sii pẹlu koodu orilẹ-ede rẹ, eyiti akọọlẹ naa ti sopọ si.',
      phoneInputLabel: 'Nomba ero ibara eni soro',
      resetButton: 'tun to',
      requestLimitMessage: 'Request limit reached. Try again in 2 hours.', // TODO
    },
    ResetPassword: {
      schema: {
        passwordError:
          'Ọrọigbaniwọle rẹ nilo lati jẹ o kere ju awọn lẹta 8 gun, ni awọn lẹta nla kan ati awọn lẹta kekere kan ninu, ati nọmba kan.',
        confirmPasswordError: 'Ijẹrisi ọrọ igbaniwọle jẹ dandan.',
        passwordsMismatchError: 'Awọn ọrọigbaniwọle ko baramu.',
      },
      passwordLabel: 'ọrọ igbaniwọle Tuntun',
      confirmPasswordLabel: 'Jẹrisi ọrọ igbaniwọle',
      resetButton: 'tun to',
    },
    Invite: {
      heading: 'Kaabo si Coldtivate.',
      employee: 'A ti pe ọ gege bi Oṣiṣẹ. Jọwọ fọwọsi fọọmu naa lati pari iforukọsilẹ rẹ.',
      operator: 'A ti pe ọ gege bi amoju ero. Jọwọ fọwọsi fọọmu naa lati pari iforukọsilẹ rẹ.',
      fields: {
        password:
          'O kere ju awọn ohun kikọ mẹjọ, o kere ju lẹta nla kan, lẹta kekere kan ati nọmba kan.',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'Itaniji iwọn gbi gbona',
      subtitle: 'a kiyesi pe iyato wa. Awon oja ti o wa ni ipamo ni wonyi',
      edit: 'se o fe se atunko gbi gbona?',
      temperature: 'iwon gbi gbona',
      newTemperature: 'iwon gbi gbona miran',
      confirm: 'se aridaju gbi  gbona miran',
      continueWithoutUpdate: 'Tẹsiwaju laisi imudojuiwọn',
      sensorHint: 'ko le se afikun gbi gbona nitori pe ati fi itani lolobo kun iwon mimu tutu',
      latestTemperature: 'Iwọn otutu tuntun ti forukọsilẹ ni {{date}}.',
    },
    emptyGeneral: 'Ni akoko, ko si data to wa.',
    emptyCoolingUser:
      'Awọn nkan ti o wa ni ibi ipamọ yoo han ninu dasibodu nigbati o ba ṣe o kere ju iwọle kan ni eyikeyi iyara.',
    noCompanyAvailable: 'Ko si ile-iṣẹ ti o wa',
    noCoolingUnitAvailable: 'Ko si ẹrọ itutu agbaiye',
    noLocationsAvailable:
      'Kaabo si Coldtivate. Bẹrẹ nipa fifi agbe gbe re kun app rẹ ni ibi iṣakoso.',
    MarketPrice: {
      emptyState: 'Awọn idiyele ọja ko si ni orilẹ ede rẹ',
      commodityLabel: 'oja',
      commodityModalTitle: 'Yan oja kan',
      Trend: {
        title: 'Yan ọja ati ipinlẹ kan lati gba asọtẹlẹ idiyele kan',
        emptyState: 'Ko si akosile ti a rii fun akojọpọ ọja ati eru yii',
        pastLabel: 'Ti o ti kọja',
        stateLabel: 'ipinle',
        stateModalTitle: 'Yan Ipinle kan',
        forecastLabel: 'Asọtẹlẹ',
        chartLabel: 'Iye owo ni {{currency}}/KG',
      },
      Ranking: {
        filter: 'ya soto nipa agbegbe',
        monthLabel: 'awọn osu',
        monthModalTitle: 'Yan awọn osu',
        stateModalTitle: 'Yan awọn ipinlẹ',
        stateLabel: 'Awọn ipinlẹ',
        table: {
          column1: 'ipinle',
          column2: 'Ọjọ́',
          column3: 'Iye owo ni {{currency}}/KG',
          emptyState: 'Ko si iye to wa',
        },
      },
    },
    CrateManagement: {
      userModalTitle: 'Yan olumulo imu tutu',
      addUserLink:
        'Olumulo itutu ko si ninu akole? Ṣafikun olumulo lati Isakoso ➜ Awọn olumulo itutu ➜ +',
      coolingUserLabel: 'olumulo itutu',
      selectCoolingUnitLabel: 'se asayan iwon itutu',
      coolingUnitLabel: 'iwon itutu',
      noUnitWarning: 'jowo yan imu tutu kan',
      noCratesWarning: 'Olumulo Itutu ti a yan ko ni awọn apoti eyikeyi ninu ẹyọ itutu yii',
      operationError: 'Nkankan ti ko tọ. Jọwọ gbiyanju lẹẹkansi nigbamii.',
      FarmerSurvey: {
        warningMessage: 'Jọwọ fọwọsi iwadi ipilẹ fun {{crop}}!',
        modal: {
          weeklyQuantityQuestion: 'Kini iye {{crop}} ti o ṣe tabi ṣowo ni ọsẹ kan?',
          cropSpoilageQuestion: 'Kini idi pato ti o n fa idibajẹ irugbin?',
          marketPriceQuestion: 'Iye owo ọja apapọ fun ọsẹ kan nigbati o ba n ta {{crop}}',
          quantityDistributionQuestion: 'Elo ni iyẹn ni:',
          selfConsumed: 'Ti a je si enu eni ({{unit}})',
          sold: 'ta ({{unit}})',
          lost: 'Ti o ta ni abẹ idiyele ọja ({{unit}})',
          totalQuantity: 'Apapọ opoiye ti a ṣe ni ọsẹ kan',
          unitWeight: 'Kọọkan {{crate}} ni',
          selectSpoilageReasonsPlaceholder: 'Yan gbogbo awọn idi ti o waye',
          priceLabel: 'Iye',
          priceUnit: 'fun {{unit}}',
          commodityShortlist: 'asayan oja',
          unit: {
            kg: 'iwon kilogram',
            crates: 'awon kireeti',
            boxes: 'Awọn apoti',
            sacks: 'Awọn apo',
            baskets: 'Awọn agbọn',
            singular: {
              kg: 'iwon kilogram',
              crates: 'kireeti',
              boxes: 'apoti',
              sacks: 'àpo',
              baskets: 'agbọn',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'Ikore ti ko tọ tabi mimu',
            inappropriateStorage: 'Ibi ipamọ ti ko yẹ / aini ipamọ atijọ',
            overproduction: 'Apọju iṣelọpọ',
            transportationDamage: 'Ipalara gbigbe',
            pest: 'Kokoro',
            diseases: 'Awọn arun',
            weather: 'Awọn ipo oju ojo to gaju',
            price: 'Awọn idiyele ọja kere ju',
            other: 'Omiiran',
          },
          errorMessages: {
            number: 'Gbọdọ jẹ asan, nọmba rere',
            reasonsForSpoilage: 'Jọwọ ṣafihan o kere ju idi kan.',
            totalMismatch:
              'Apapọ ti jijẹ ti ara ẹni, Tita ati Ti o sọnu tabi ti o ta ni abẹ idiyele ọja yẹ ki o dọgba si apapọ opoiye ti a ṣejade.',
            cropError: 'Jọwọ yan eru kan',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'se asayan awon kreeti ti o fe yo',
        selectAll: 'yan gbo gbo e',
        checkIn: 'wole',
        days: 'awon ojo',
        day: 'ojo',
        daysLeft: 'O ku ọjọ {{amount}}',
        ttp: 'TTP',
        numberOfCrates: 'onka kreeti',
        totalWeight: 'apapo iwuwo',
        priceType: 'iru iye owo',
        crate: 'kireeti',
        pricePerProduct: 'iye owo oja kookan',
        calculatedPrice: 'iṣiro Iye owo',
        discount: 'Edinwo',
        priceWithDiscount: 'apapo iye',
        paymentType: {
          label: 'irufe ona ati sanwo',
          cash: 'Owo owo',
          creditCard: 'Kaddi kirediti',
          bankTransfer: 'Bank Transfer', // TODO
        },
        bankTransfer: {
          title: "Receiver's Details", // TODO
          accountName: 'Account Name', // TODO
          accountNumber: 'Account Number', // TODO
          bankName: 'Bank Name', // TODO
        },
        paid: 'ti sanwo',
        lockedWithinPendingOrders:
          'Crates that are locked in pending orders cannot be checked out.', // TODO
      },
      CheckIn: {
        emptyState: 'Ko si awọn apoti ti a ṣafikun sibẹsibẹ',
        addCrates: 'fi kun apoti',
        cratesAddedLabel: 'Crates Added', // TODO
        checkInWithCode: 'wole pelu koodu',
        estimatedCost: 'iye owo tia fi oju sun',
        pricing: 'idiyele',
        day: 'ojo',
        successMessage: 'Awọn apoti ti a ṣayẹwo ni aṣeyọri',
        emptyMessage: 'Jọwọ ṣafikun o kere ju apoti kan si iṣayẹwo rẹ',
        noPlannedDaysMessage:
          'awon Ojo ti a padanu lori awọn ohun kan. Ko le ṣe iṣiro iye owo ti a fi ojusun.',
        seeMore: 'See more', // TODO
        seeLess: 'See less', // TODO
        listed: 'Listed', // TODO
        WithCode: {
          modalTitle: 'seda ati wole ninu ati jade ti o ti seda t le ri',
          modalDescription:
            'Iwọ yoo nilo koodu ji jade lati bẹrẹ ayẹwo tuntun ni ọna yii. Ti o ko ba ni, ronu bẹrẹ ayẹwo tuntun kan. Ti o ba mọ igba melo ti o gbero lati fipamọ, ronu fifi nọmba awọn ọjọ kun nibi.',
          codeLabel: 'fi koodu kun',
          codeErrorMessage: 'O nilo koodu ',
          failedMessage:
            "Check in failed. Please make sure your code hasn't been used already or contact support.", // TODO
        },
        SelectCropType: {
          fruits: 'Awọn eso',
          vegetables: 'Awọn ẹfọ',
          rootVegetables: 'Gbongbo Ẹfọ',
          other: 'Awọn nkan miiran',
        },
        SelectCrop: { additionalInfo: 'Afikun Alaye' },
        Setup: {
          selectedCrop: 'asayan irugbin',
          changeCropButton: 'Tẹ ibi lati yi irugbin pada',
          individualCrateWeightButton: 'Tẹ ibi lati ṣatunkọ iwuwo kreeti kọọkan',
          individualCrateIdButton: 'Tẹ ibi lati ṣatunkọ awọn ID crate kọọkan',
          numberOfCratesLabel: 'onka kreeti',
          crateWeightLabel: 'Gbogbo iwon kireeti ',
          pricePerDayAndCrateLabel: 'Iye owo fun ọjọ kan / apoti',
          pricePerDayAndKilogramLabel: 'Iye owo fun ọjọ kan / kg',
          fixedPriceLabel: 'gbedeke iye',
          totalPriceLabel: 'apapo iye',
          plannedDaysLabel: 'iye ojo ti a gbero fun ipamo',
          harvestDateLabel: 'Igbawo ni ikore irugbin wa ye?',
          harvestDateValues: {
            today: 'oni',
            yesterday: 'ana',
            dayBefore: 'ijeta',
            evenBefore: 'paa pa julo igba kan ri',
          },
          crateWeightAndPricing: {
            applyAll: 'Apply to all', // TODO
            list: 'List for sale', // TODO
            addMore: 'Add more', // TODO
            sellingPrice: 'Listing selling price', // TODO
            potentialSellingPrice: 'Potential selling value', // TODO
            info: 'The price configuration refers to product sale, not cooling storage fee.', // TODO
            unavailableId: 'ID not set', // TODO
          },
          cratesError: 'Jọwọ fi kan rere nọmba crate',
          crateWeightError: 'Jọwọ fi iwuwo apoti rere sii',
          harvestDateError: 'Ọjọ ikore ni a nilo',
          modals: {
            weight: 'Ṣeto iwuwo Olukuluku kreeti',
            id: 'Ṣeto Olukuluku ID ti Crates',
            crateLabel: 'kireeti',
            selectInitialId: 'Jọwọ ṣeto ID ibẹrẹ apoti',
            serialize: 'sẹ̀ríàlìsà',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: { label: 'iwon itutu: {{name}}', header: 'se asayan iwon itutu' },
      occupancy: 'Ibugbe ti ẹyọ itutu lọwọlọwọ',
      week: 'ose yi',
      today: 'oni',
    },
    CoolingUnitsRoomConditions: {
      heading: 'Itan iwọn otutu',
      temperature: 'Iwọn  ti tutu',
      lastUpdated: 'Imudojuiwọn to kẹhin ni {{date}}',
      enterTemperature: 'te Iwọn ti tutu',
      toasts: { confirmation: 'Atunṣe iwọn otutu bi o ti tọ' },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'oja',
      percentage: 'ipin lona ogorun',
      weight: 'Iwuwo',
      crates: 'awon kireeti',
      optimalTemp: 'Ti o dara ju T°C',
      messages: {
        empty:
          'Ibugbe awọn ẹya itutu ati iwọn otutu yoo han nibi nigbati o ba ṣe o kere ju ayẹwo kan ni eyikeyi yara.',
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'yara oloja kan: {{crop}}',
      multiCommodity: 'Yara olopo oja',
      publicMaker: 'itutu ita gba n gba',
      usedMarker: 'Ẹka itutu ti o ti lo tẹlẹ',
    },
    Company: { SelectCompany: { label: 'Orukọ Ile-iṣẹ: {{name}}', header: 'Yan ile-iṣẹ kan' } },
    ProduceDetails: {
      seeDetails: 'Wo alaye',
      kilogram: 'iwon kilogram',
      coolingUser: 'olumulo itutu',
      contact: 'kan si',
      contactCopied: 'Ti daakọ!',
      crates: 'awon kireeti',
      crate: 'kireeti',
      cropType: 'irufe Irugbin',
      numberOfCrates: 'onka kreeti',
      crateIds: 'Crate ID',
      combinedWeight: 'Iwuwo ti a apapọ',
      remainingTime: 'Akoko to ku lati gba oja',
      currentStorageDays: 'Awọn ọjọ ti a n fipamọ lọwọlọwọ',
      plannedDays: 'Awọn ọjọ ti a gbero',
      pricePerDay: 'Iye owo / ọjọ',
      plannedStorageCost: 'Awọn idiyele ipamọ ti a gbero',
      pickUp: 'gbaa lati inu',
      days: 'ojo pupo',
      noDTMessage: 'Awoṣe Shelf-life kan ko si fun ọja pataki yii.',
      checkOutButton: 'jade',
      cratesListedForSale: '{{amount}} crate(s) marked as listed for sale', // TODO
      preSaleError:
        "Please note: You can't change the listing status of crates with pending orders. If this doesn't seem to apply, please contact support for assistance.", // TODO
      operatorNoBankAccountWarning:
        "{{name}} doesn't have bank account details in order to receive payouts for their sales. Please add their Bank Account details in case they shared those with you.", // TODO
      farmerNoBankAccountWarning:
        "You don't have a Bank Account defined to receive payouts on your sales. Please add your Bank Account details", // TODO
      operatorNoCompanyBankAccount:
        "This cooling unit doesn't support marketplace listings. Please reach out to the company's manager to handle this matter.", // TODO
      employeeNoBankAccount:
        "This company doesn't have a Payouts Bank Account set up that enables receiving funds for both produces and cooling fees sold in the marketplace. Set it up to allow crates in your cooling units to be listed in the marketplace.", // TODO
      addBankAccountButton: 'Add bank account details', // TODO
      addBankAccountHeader:
        "You're setting up the bank account details on behalf of {{name}}. Please insert this data carefully as you'll not be able to make changes to it afterwards.", // TODO
      userWithoutPhone:
        'Crates belonging to this account cannot be listed for sale as no bank account can be linked to User without a phone', // TODO
    },
    SearchFilter: {
      detailsMessage:
        'Wa wiwa wọle nipa lilo iru irugbin, orukọ agbe, awọn ọjọ ni ibi ipamọ, awọn ọjọ ti o ku ni ibi ipamọ, tabi koodu iwọle',
      idMessage: 'Wa apoti kan nipa lilo nọmba ID ti a lo lati ṣe idanimọ apoti kan pato',
      crateDetailsButton: 'Wa fun Crate Awọn alaye',
      crateIdButton: 'Wa fun Crate ID',
      searchLabel: 'Wa…',
    },
    SortMenu: {
      title: 'Sa pelu',
      options: {
        cropType: 'irufe Irugbin',
        timeToPick: 'Akoko lati gba',
        checkInDate: 'ọjọ ti a gbe wole (akọkọ si eyi ti o keyin)',
        checkInDateReverse: 'ọjọ ti a gbe wole ( eyi ti o keyin si akọkọ)',
        coolingUser: 'Orukọ olumulo itutu',
      },
    },
    Management: {
      Delivery: {
        companyName: 'Company name', // TODO
        companyNamePlaceholder: 'Insert company name', // TODO
        companyNameError: 'Please insert the company name', // TODO
        contactName: 'Contact name', // TODO
        contactNamePlaceholder: 'Insert contact name', // TODO
        contactNameError: 'Please insert the contact name', // TODO
        phoneNumber: 'Phone number', // TODO
        phoneNumberPlaceholder: 'Insert phone number', // TODO
        emptyMessage: 'No contacts have been added yet', // TODO
        deleteContactMessage: 'Are you sure you want to delete this contact?', // TODO
        noAvailableContacts: 'There are no available contacts for this particular cooling unit.', // TODO
        contactedAddedSuccessfully: 'Contact added successfully.', // TODO
      },
      Location: {
        emptyState: 'Ko si awọn agbe gbe ti a ti se afikun rẹ. Tẹ ami + lati ṣafikun ọkan.',
        text: {
          invited: 'ti a Pe ({{amount}})',
          registered: 'a ti fi orukọ re silẹ ({{amount}})',
        },
        chips: {
          address: 'Adirẹsi',
          coordinates: 'Awọn ipo-idojuko',
          geolocation: 'agbe gbe ibi ti ero ibara eni soro wa',
        },
        fieldErrorMessages: {
          latitude: 'Enter a number between -90 and 90 (e.g., 34.0522)', // TODO
          longitude: 'Enter a number between -180 and 180 (e.g., -118.2437)', // TODO
        },
        fields: {
          name: 'Oruko',
          latitude: 'làbúayé',
          longitude: 'Làróayé',
          country: 'Orilẹ-ede',
          state: 'ipinle',
          city: 'ilu',
          zipCode: 'koodu ifiweranse',
          street: 'opopona',
          streetNumber: 'nomba opopona',
        },
        modal: {
          message:
            'Iṣẹ ṣiṣe yii yoo paa gbogbo awọn ẹya itutu ti o ni nkan ṣe pẹlu agbe gbe yii rẹ. nje o fẹ tẹsiwaju bi?',
        },
        actions: { currentLocation: 'Yan agbe gbe ti  o wa lọwọlọwọ' },
        toasts: {
          addLocationSuccess: 'Ti se aṣeyọri ifikun agbe gbe',
          editLocationSuccess: 'Ti se aṣeyọri ti tun agbe gbe ko',
          removeLocationSuccess: 'agbe gbe {{name}} ti paarẹ yọri.',
          failedToFetchLocation:
            'Unable to retrieve the location. Please check the address and try again.', // TODO
          positionCancelled: 'Location request canceled.', // TODO
          positionUnauthorized: 'Location denied. Please grant permission to continue.', // TODO
          locationUnavailable: 'Location disabled. Please enable to continue.', // TODO
          locationSubmissionError: 'An error occurred. Please review your location and try again.', // TODO
        },
      },
      Operators: {
        banner:
          'Lẹhin fifi olumulo kun, wọn yoo gba atejise kan pẹlu ọna asopọ ifiwepe, nibiti wọn le mu akanti wọn ṣiṣẹ.',
        text: { gender: 'Akọ abi abo', ma: 'Akọ', fe: 'abo', ot: 'Omiiran' },
        fields: { selectCoolingUnit: 'se asayan imu tu tu', coolingUnits: 'Awọn ohun imu itutu' },
        actions: { invite: 'Pe', save: 'Fi awọn ayipada pamọ' },
      },
      AddOperator: {
        messages: { operator: 'Lati darapọ mọ app Coldtivate bi eni ti oun lo, lọ si: {{link}}' },
        toasts: {
          success: 'Ti se aṣeyọri pi pe amoju ero',
        },
        phoneFormat: 'Rii daju pe nọmba foonu ti o tẹ sii ni koodu orilẹ-ede kan.',
      },
      EditOperator: { toasts: { success: 'ti se aṣeyọri atunkọ amoju ero' } },
      AddCoolingUser: { toasts: { add: 'Ṣafikun olumulo Itutu' } },
      CompanyDetails: {
        labels: {
          name: 'Oruko',
          uploadLogo: 'fi àmì ìdánilẹ́kọ si ori ero ayelujarà',
          logo: 'àmì ìdánilẹ́kọ̀',
          country: 'Orilẹ-ede',
          commodity: 'asayan oja',
          currency: 'iru Owo',
        },
        headings: {
          country: 'Select a country',
          commodity: 'Yan oja kan',
          currency: 'Yan iru owo kan',
        },
        actions: { save: 'Fi awọn ayipada pamọ' },
        toasts: {
          success: 'Ti se aṣeyọri atunkọ',
          photoLibrary: 'Permission Denied: Please enable access to your Photo Library.', // TODO
        },
      },
      RegisteredEmployee: {
        invited: 'ti a Pe ({{amount}})',
        registered: 'a ti fi orukọ re silẹ ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'Lati pa akọọlẹ rẹ rẹ, lọ si alaye akanti.',
        deleteOther: 'Ti o ba fẹ pa akọọlẹ akanti yii rẹ, jọwọ kan si wa  {{contact}}',
      },
      AddRegisteredEmployee: {
        message: 'Lati darapọ mọ ohun elo Coldtivate bi Oṣiṣẹ ti Iforukọsilẹ, lọ si: {{link}}',
        toasts: { success: 'Oṣiṣẹ ti o forukọsilẹ ni aṣeyọri pe' },
      },
      CoolingUsers: {
        modals: {
          selectMethod: 'Bawo ni o ṣe fẹ fi olumulo kun?',
          userCode: 'Tẹ koodu olumulo sii',
          userCodeDesc:
            'O le wa koodu naa ninu awọn alaye akọọlẹ rẹ ti o ba forukọsilẹ bi olumulo itutu.',
          addByCode: 'fi olumulo kun nipase koodu',
          addWithDetails: 'fi olumulo kun pelu alaye lekun rere',
        },
        toasts: {
          notFound: 'Ko si olumulo itutu pẹlu koodu olumulo yii ti a rii.',
          taken: 'Olumulo yii ti wa tẹlẹ ninu awọn olumulo itutu rẹ.',
        },
      },
      EditCoolingUsers: {
        accountDetails: 'Payout Details', // TODO
        toasts: {
          noSurveys: 'No surveys have been completed yet.', // TODO
          warning:
            'Akanti yìí kò ṣe é parẹ́ nítorí pé oníṣe náà ní àwọn àyẹ̀wò tí ń ṣiṣẹ́ nínú ẹ̀ka ìtura {{names}}. Jọwọ fi to olumulo leti lati wa si yara lati wa gbe awọn nkan wọnyi jade ki o to le pa akanti naa rẹ!',
          confirmation:
            'Ṣe o da ọ loju pe o fẹ paa olumulo yii rẹ ninu akoole awọn olumulo itutu  rẹ? Iṣẹ yii yoo paa olumulo itutu yii rẹ ati pe ko le yipada!',
          edit: 'ti se aṣeyọri atunkọ olumulo itutu',
          noCoolingUnits: 'O ko ni ẹya itutu kan kan',
          updateSuccess: 'Ni aṣeyọri imudojuiwọn',
        },
        pdf: {
          dateRange: 'Iwọn ọjọ',
          selectedUnits: 'Awon eyo itutu ti a ti yan',
          coolingUnit: 'iwon itutu',
        },
        actions: {
          downloadFarmers: 'Ṣe igbasilẹ data dasibodu agbe',
          completeLater: 'Pari nigbamii',
        },
      },
      CoolingUnit: {
        emptyState:
          'Ko si awọn ẹya itutu agbaiye ti a ṣafikun ni ipo yii. Tẹ ami + lati fi ọkan kun.',
      },
      AddCoolingUnit: {
        heading: 'Awọn ohun-ini itutu',
        fields: {
          name: 'Awọn ohun-idanimo itutu',
          location: 'agbegbe',
          coolingUnitType: 'Kini o ṣe apejuwe ẹya itutu yi ni ki kun?',
          metricUnit: 'Ẹyọ',
          price: 'Iye',
          capacityInMetricTons: 'Apapọ iwọn to sofo',
          foodCapacityInMetricTons: 'Apapọ iwọn ounje',
          roomSizeHeading: 'Iwọn ti tobi itutu',
          length: 'Gigun',
          width: 'Ìbú',
          height: 'Giga',
          weight: 'Iwuwo',
          roomInsulator: 'Igbana sara',
          capacityInNumberCrates: 'iye kireeti to po julo',
          crateWeight: 'iwuwo kireeti so setewogba',
          crateSizeHeading: 'Awọn iwọn ti a boṣewa crate',
          editableCheckins: 'Ṣe awọn iṣayẹwo-iwọle jẹ ṣiṣatunṣe nipasẹ awọn oniṣẹ',
          sensorAvailable: 'Sensọ ti o wa',
          public:
            'Ṣe o fẹ lati jẹ ki ẹyọ itutu rẹ han fun awọn olumulo itutu (agbegbe, iru yara, agbara ati alaye idiyele)?',
          crops: 'awon oja',
          selectCrops: 'Yan awon oja',
          refrigerantType: 'Iru imu tutu ti a lo',
          amountRefrigerant: 'Iye ohun imu tutu',
          powerConsumptionInMt: 'Lilo agbara ti itutu fun MT koo kan',
          dailyRoomWattage: 'lilo agbara mona mona Ojoojumọ ti yara',
          powerSource: 'Bawo ni a se n ro ẹyọ itutu ni agbara?',
          powerSourceDieselConsumptionKwh: 'iye disu ti ero amunawa Diesel n lo lori kWh koo kan',
          pvPanelType: 'iru paneli PV',
          pvPanelCount: 'iye nọmba paneli PV',
          pvPanelSize: 'Iwọn paneli kan',
          pvPanelWeight: 'Iwuwo paneli kan',
          pvPanelMaxPower: 'Iwọn agbara paneli kan to po ju',
          powerSourceDieselPercent: 'ero amunawa disu',
          powerSourceGridPercent: 'griidi',
          powerSourcePvPercent: 'Awọn paneli PV',
          powerSourceBiomassPercent: 'Baomasi',
          electricityStorageSystem: 'eto ipamọ Ina mona mona',
          thermalStorageMethod: 'ọna ipamọ gbi gbona',
          batteryCount: 'Nọmba awọn batiri',
          batteryWeight: 'Iwọn batiri',
          batteryCapacity: 'Iwọn agbara batiri eyokan',
          batteryMaxCurrent: 'O pọju gbigba agbara lọwọlọwọ batiri kan',
          batteryPeakEnergyStorage: 'Ibi ipamọ agbara ni ipele ti o ga julọ ti batiri kan',
          batteryType: 'Iru awọn batiri',
          selectSensorType: 'Yan iru sensọ kan',
          addTempSensor: 'Ṣafikun sensọ iwọn otutu si ẹyọ itutu rẹ.',
          sensorDesc: {
            default: 'Beere alaye yii lati ọdọ olupese sensọ rẹ ti ko ba wa ni ọwọ.',
            ubibot: 'Wa awọn alaye wọnyi ninu akọọlẹ ubibot rẹ.',
          },
          ecozen: { username: 'Orukọ olumulo', password: 'oro-iwole', machineId: 'idanimo Ẹrọ' },
          ubibot: {
            accountKey: 'kokoro akant',
            channelId: 'ikanni idanimo',
            sensorFieldTitle: 'Yan aaye sensọ rẹ',
            sensorFieldDesc: 'Yan aaye sensọ rẹ',
            field: 'aaye',
          },
          figorr: { apiKey: 'kọkọrọ API', deviceTag: 'àmì ìdánilẹ́kọ̀ ẹ̀rọ̀' },
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: 'O jẹ yara ipamọ ti a gbe si ẹnu-bode oko kan',
          MARKET_STORAGE_ROOM: 'O jẹ yara ipamọ ti a gbe si oja kan',
          MOVABLE_UNIT: 'O jẹ ẹyọ ti o ṣee gbe ka (fun apẹẹrẹ, ọkọ nla ti o ni firiji)',
          OTHER: 'Omiiran',
        },
        pricing: {
          label: 'iru iye owo',
          PERIODICITY: 'lojoo jumo',
          FIXED: 'gbedeke to ga julo',
          day: 'ojo',
        },
        metricUnit: { label: 'Ẹyọ', KILOGRAMS: 'iwon kilogram', CRATES: 'kireeti' },
        toasts: {
          addSuccess: 'ti se aṣeyọri afikun ẹyọ itutu',
          integrationError: 'Ko le sopọ si sensọ. Ṣe ijẹrisi data rẹ tabi kan si olupese sensọ rẹ.',
          integrationSuccess: 'Ti se aṣeyọri ijẹri awọn ẹri sensọ.',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete: 'Iṣẹ yii yoo pa ẹyọ itutu yii re pẹlu itan-akọọlẹ rẹ. Ṣe o fẹ tẹsiwaju bi?',
        },
        buttons: { viewExisting: 'Wo ti o wa tẹlẹ', editPricing: 'Ṣatunkọ Ifowoleri' },
        toasts: {
          editSuccess: 'ti se aṣeyọri atunkọ ẹyọ itutu',
          cantDelete: 'eka itutu yii ko se e pare tori o ni awon ayewo iwole',
          successDelete: 'Ẹka itutu {{name}} ti paarẹ',
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'Yan awọn ọjọ',
        empty:
          'Iwole ati Ijade yoo han ninu dasibodu nigbati o ba ṣe o kere ju iwole kan ni eyikeyi yara.',
        downloadDataButton: 'Ṣe igbasilẹ data',
        modal: { title: 'Ṣeto iṣeto ni', coolingUnitSelection: 'Yan ẹyọ itutu agbaiye:' },
        summary: {
          totalCheckIns: 'Àpapọ̀ iye àwọn iwole:',
          totalCrates: 'apapo nomba kireeti',
          totalWeight: 'apapo iwuwo',
          totalUsers: 'Àpapọ̀ nọmba awọn olumulo ni pato:',
          weightUnit: 'iwon kilogram',
        },
      },
      RevenueAnalysis: {
        summary: { total: 'Apapọ ere owo to wole' },
        paymentType: {
          label: 'Yan awọn ọna isanwo:',
          cash: 'Owo owo',
          creditCard: 'Kaddi kirediti',
          bankTransfer: 'Bank Transfer', // TODO
        },
      },
      Coupons: {
        title: 'Discount coupons', // TODO
        emptyMessage: 'Ko si awọn kuponu ti a ti ṣafikun sibẹsibẹ',
        addCoupon: 'Fi Kupọọnu kun',
        code: 'koodu kupọọnu',
        percentage: 'Kupọọnu ogorun',
        revokeTitle: 'Kupọọnu fagile',
        revoke: 'Revoke', // TODO
        revokeMessage:
          'Ṣe o da ọ loju pe o fẹ fagilee kupọọnu yii? Ni kete ti fagile, ko le ṣee lo lẹẹkansi ati pe ẹdinwo naa kii yoo wa mọ. Iṣe yii jẹ titilai ati pe ko le ṣe atunṣe.',
        messages: {
          codeField: 'Must be max 25 characters and contain only letters and numbers', // TODO
        },
      },
    },
    Marketplace: {
      buyerSelection: {
        onBehalfOfCompany: 'Buy on behalf of company', // TODO
        forMyself: 'Buy for myself', // TODO
        label: 'Buyer', // TODO
      },
      sorting: {
        'price-asc': 'Price ascending', // TODO
        'price-desc': 'Price descending', // TODO
        'nearby-me': 'Near to me', // TODO
      },
      distance: {
        withing5Km: '1 to 5 KM away', // TODO
        within10Km: '5 to 10 KM away', // TODO
        within25Km: '10 to 25 KM away', // TODO
        beyond25Km: 'More than 25 KM away', // TODO
      },
      priceConfig: 'The price configuration refers to product sale, not cooling storage fee.', // TODO
      addToCart: {
        addToCartButton: 'Add to cart and continue shopping', // TODO
        buyFullCrate: 'Buy full crate', // TODO
        selectQuantity: 'Select quantity', // TODO
        goToCart: 'Go to Cart Summary', // TODO
      },
      currentLocation: 'Current location', // TODO
      invalidFormatWarning: 'Ikilọ: Ẹ̀rọ orúkọ ìlú kò tọ́. Àbájáde lè má jẹ́ dídáhùn dáadáa.',
      unresolvedCityFormatWarning:
        'Ikilọ: A kò lè rí ìlú tí a sọ ní kàkàkí. Àbájáde lè má jẹ́ dídáhùn dáadáa.',
      lowConfidenceWarning:
        'Ikilọ: A kò lè dá ìdánilójú pé ìlú náà jẹ́ tọ́. Àbájáde lè má jẹ́ dídáhùn dáadáa.',
      filterGeneralWarning:
        'Ikilọ: Àṣìṣe kan ṣẹlẹ̀ nígbà àyẹ̀wò ibi. Àbájáde lè má jẹ́ dídáhùn dáadáa.',
      standardCrateWeight: 'Standard weight of crate is {{value}} kg', // TODO
      owner: 'Owner', // TODO
      priceRange: 'Range Price / KG',
      Filters: {
        min: 'Min',
        max: 'Max',
        label: 'Filters',
        coolingUnitLabel: 'Cooling unit', // TODO
        coolingUnitHeading: 'Select cooling units', // TODO
        cropTypeLabel: 'Produce / Crop Type', // TODO
        cropTypeHeading: 'Select crops', // TODO
        companyLabel: 'Company', // TODO
        companyHeading: 'Select companies', // TODO
      },
      maxDistance: 'Max Distance',
    },
    AccountDetails: {
      popups: {
        default: 'Ṣe o da ọ loju pe o fẹ pa akanti rẹ rẹ bi?',
        lastRegisteredEmployee:
          'Iwọ nikan ni Oṣiṣẹ ti o forukọsilẹ ni ile-iṣẹ naa, iṣe yii yoo paa ile-iṣẹ naa rẹ!',
        activeCheckInOP:
          'Ẹka(awọn) itutu {{names}} ti a yan o si ni awọn iṣayẹwo ti nṣiṣe lọwọ ati pe iwọ ni oniṣẹ ikẹhin ninu rẹ. O nilo lati ṣayẹwo gbogbo awọn ọja tabi fi to Oṣiṣẹ Iforukọsilẹ leti lati fi oniṣẹ ẹrọ miiran si ẹyọkan itutu ṣaaju ki o to le pa akanti rẹ rẹ!',
        activeCheckInRE:
          'O ko le pa akanti rẹ rẹ ti o ba jẹ Oṣiṣẹ Iforukọsilẹ ti o kẹhin ati pe awọn iṣayẹwo ti nṣiṣe lọwọ wa lori diẹ ninu awọn ẹya itutu yii, nitori iṣe yii yoo pa ile-iṣẹ rẹ rẹ. Jọwọ rii daju pe gbogbo awọn iṣayẹwo ti nṣiṣe lọwọ ni (awọn) ẹyọ-itutu {{names}} ni a akọkọ gbe jade na.',
        activeCheckInCU:
          'O ko le pa akanti rẹ rẹ nitori pe o ni awọn iṣayẹwo ti nṣiṣe lọwọ ni awọn apa itutu {{names}}. Jọwọ gbe awọn nkan wọnyi jade na, lẹhinna gbiyanju lẹẹkansi lati pa akanti rẹ rẹ!',
      },
      fields: { location: 'agbegbe', userCode: 'koodu  igbewọle olumulo Itutu' },
      toasts: { success: 'Ti se aṣeyọri imudojuiwọn olumulo' },
      sections: {
        sellerSettings: 'Awọn Eto Olutaja',
        companySellerSettings: 'Seller Settings (Company)', // TODO
        buyerSettings: 'Olura Eto',
        details: 'Awọn alaye',
      },
      ContactsSharing: {
        publicPhone: 'Ṣe nọmba foonu ni gbangba',
        publicEmail: 'Ṣe imeeli ni gbangba',
      },
      PayoutSettings: {
        addTitle: 'Jọwọ fi alaye akọọlẹ banki rẹ sii',
        editTitle: 'Alaye akọọlẹ banki rẹ',
        addTittleForCompany: "Please insert you company's bank account information", // TODO
        editTitleForCompany: "Your company's bank account information", // TODO
        form: {
          nameLabel: 'Account name', // TODO
          namePlaceholder: 'Insert account name', // TODO
          accountNumberLabel: 'Nọmba ifowopamọ',
          accountNumberPlaceholder: 'Fi nọmba iroyin sii',
          bank: 'Bank', // TODO
          countryLabel: 'Country', // TODO
          nigeria: 'Nigeria', // TODO
          selectBank: 'Select bank from list', // TODO
          accountType: 'Account Type', // TODO
          selectAccountType: 'Select account type', // TODO
          accountTypes: {
            personal: 'Personal', // TODO
            business: 'Business', // TODO
          },
          errors: {
            accountName: 'Account name is required', // TODO
            account: 'A nilo nọmba akọọlẹ',
            accountType: 'Account type is required', // TODO
            bank: 'Orukọ banki nilo',
          },
        },
        successMessage: 'A fi kun akọọlẹ banki ni aṣeyọri.',
        errorMessage:
          'A ko le ṣe àyẹ̀wò alaye àkọọlẹ náà. Jọ̀wọ́ ṣàyẹ̀wò nọ́mbà àkọọlẹ àti orúkọ ilé-ìfowópamọ́ fún àwọn aṣiṣe tó lè wà.',
      },
      PaymentSettings: {
        cards: 'Awọn kaadi',
        creditCard: {
          predefined: 'Ti ṣe asọye tẹlẹ',
          owner: 'Oruko Enitiomu kaadi sowo',
          date: 'Ọjọ Ipari',
          cvv: 'CVV',
        },
        AddCreditCard: {
          title: 'Jọwọ fi alaye kaadi rẹ sii',
          form: {
            cardName: 'Orukọ kaadi',
            cardNamePlaceholder: 'Fi orukọ kaadi sii',
            cardNumber: 'Nomba kaadi',
            cardNumberPlaceholder: 'Fi nọmba kaadi sii',
            expiryDate: 'Ọjọ ipari',
            securityCode: 'Koodu aabo',
            securityCodePlaceholder: 'Fi koodu aabo kaadi sii',
            predefinedMethod: 'Ọna isanwo ti a ti sọ tẹlẹ',
            successMessage: 'Kaadi kun ni aṣeyọri',
            cardNameError: 'Orukọ kaadi ni a beere',
            cardNumberError: 'Nọmba kaadi wa ni ti beere',
            securityCodeError: 'A nilo koodu aabo',
          },
        },
      },
    },
    About: {
      runtimeAgree: 'Comsol adehun asiko isise',
      userLicense: 'Adehun Iwe-aṣẹ Olumulo Ipari',
      privacyPolicy: 'Asiri Afihan',
      comsolAbout: 'Nipa comsol',
    },
    KnowledgeHub: {
      comic: 'Irinajo agbe: Awon ohun apanilẹrin',
      cooling: 'Kini Itutu-bi-iṣẹ?',
      quality: 'Bii o ṣe le mu didara irugbin pọ si',
      optimal: 'Awọn ipo ipamọ to dara julọ ni wa ni iyara itutu ọlọpọ oja',
      table: 'tabili ipamọ Irugbin',
      sensors: 'Awọn sensọ iwọn otutu ati awoṣe Akoko-lati-gbe',
      tips: 'Italolobo fun igbewole awon kireeti',
      glitches: 'Bii o ṣe le dahun si awọn kolu n koho imọ-ẹrọ ninu yara tutu',
      source: 'Orisun: Jọwọ tọka si Itọsọna Awọn Amoju fun alaye siwaju sii:',
      clickHere: 'tẹ ibi',
    },
    History: {
      cropsLabel: '{{crop}} and {{amount}} more', // TODO
      priceLabel: 'Iye',
      empty:
        'Iwole ati Ijade yoo han ninu dasibodu nigbati o ba ṣe o kere ju iwole kan ni eyikeyi yara.',
      sortMenuOptions: {
        cropType: 'irufe Irugbin',
        movementDate: 'Ọjọ gbigbe (akọkọ si tuntun)',
        movementDateReverse: 'Ọjọ gbigbe (titun si akọkọ)',
        checkInFirst: 'kọkọ wọle na',
        checkOutFirst: 'Ṣayẹwo jade akọkọ',
        coolingUser: 'Orukọ olumulo itutu',
      },
      optionsMenu: {
        common: {
          pdfReceipt: 'Ṣe igbasilẹ risiti pdf',
          seeMovement: 'See movement', // TODO
        },
        checkOut: {
          seeDetails: 'Wo alaye',
          smsReceipt: 'Ṣe igbasilẹ risiti SMS',
          marketSurvey: 'Se akosile iwadi oja',
        },
        checkIn: { edit: 'Ṣatunkọ bi o se wọle' },
      },
      detailsModal: {
        operatorNameLabel: 'Ṣayẹwo Orukọ olumulo',
        operatorNumberLabel: 'Ṣayẹwo nomba olumulo',
        checkOutDateLabel: 'Ṣayẹwo jade ọjọ',
        marketSurveyLabel: 'Iwadi ọja ti pari',
        cratesLabel: 'awon kireeti',
        combinedWeightLabel: 'Iwuwo ti a apapọ',
        paymentMethodLabel: 'ona isanwo',
        cropTypeLabel: 'irufe Irugbin',
        checkInCodeLabel: 'Ṣayẹwo Ni koodu',
        crateIdsLabel: 'Crate ID',
      },
      pdfModal: {
        coolingUserLabel: 'olumulo itutu',
        dateLabel: 'ọjọ',
        weightLabel: 'Iwuwo (kg)',
        downloadButton: 'Ṣe igbasilẹ risiti',
        downloadName: '{{code}} - gbigba',
        successMessage: 'Gbigba lati ayelujara!',
        errorMessage: 'Nkankan ti ko tọ. Jọwọ gbiyanju lẹẹkansi nigbamii.',
        checkOut: {
          title: 'Ile-iṣẹ',
          checkOutLabel: 'koodu ijade',
          idLabel: 'amin idanimo',
          itemLabel: 'Nkan',
          calculatedPriceLabel: 'iṣiro Iye owo',
          discountLabel: 'Edinwo',
          totalPrice: 'apapo iye',
        },
        checkIn: {
          title: 'risiti iwole',
          operatorLabel: 'oniṣẹ',
          codeLabel: 'koodu iwole',
          companyLabel: 'Ile-iṣẹ',
          coolingUnitLabel: 'iwon itutu',
          priceLabel: 'Iye {{currency}} / Ọjọ',
          cropLabel: 'Irugbin',
          numberOfCratesLabel: 'onka kreeti',
          totalLabel: 'Lapapọ',
        },
      },
      editCheckIn: {
        contactLabel: 'kan si',
        coolingUserLabel: 'olumulo itutu',
        disclaimer: 'jowo mo pe: Akoko lati gbaa jẹ iye awọn ọjọ ti a fi oju sun.',
        disclaimerMessage:
          'jowo mo pe. Ṣe akiyesi pe Akoko lati gbaa jẹ iye awọn ọjọ ti a fi oju sun. Iṣiro yii da lori awọn awoṣe isọdiwọn fun eso tabi eya ẹfọ ati iṣeṣiro oni-nọmba kan. Idibajẹ didara gangan ti ọja sibẹsibẹ tun da lori awọn ipo oju ojo agbegbe, awọn ipo idagba, ọjọ ikore ati awọn omiiran. Nitorinaa, awọn iyapa lati ọjọ ti a ti woye re tele lati gbaa waye.',
        selectCropLabel: 'Yan oja kan',
        successMessage: 'Ṣayẹwo-in ni imudojuiwọn ni aṣeyọri!',
        errorMessage: 'Kuna lati mu imudojuiwọn wọle. Jọwọ gbiyanju lẹẹkansi.',
      },
      survey: {
        fillMessage: 'Jọwọ fọwọsi iwadi ipilẹ fun {{crop}}!',
        baseSurvey: {
          occupationQuestion: 'Ohun ti o se apejuwe re daada',
          occupationFarmer: 'agbe kan',
          occupationTrader: 'Oun taja alabode/onisowo/alatapọ',
          usageQuestion: 'Njẹ o ti lo yara tutu ni igba atijọ?',
          newUser: 'Rara, Mo jẹ olumulo tuntun',
          oldUser: 'Bẹẹni, Mo ti lo yara tutu naa',
          mostUsedCommoditiesQuestion: 'ikore to po julo/Awon Oja ti o ni kata kara',
          commodity: 'oja',
          newCommodity: 'oja {{index}}',
          fillCommoditiesMessage:
            'Jọwọ fọwọsi awọn ibeere ni isalẹ fun awọn ọja ti o gbero lati mu wa si yara nigbagbogbo.',
          addCommodityButton: 'fi oja kun',
          genericFormError: 'Jọwọ yan aṣayan kan',
          experienceError: 'Jọwọ ṣafihan iye kan',
        },
        marketSurvey: {
          title: 'Jọwọ dahun awọn ibeere wọnyi fun awọn apoti ti {{crop}} ti o ṣayẹwo.',
          locationQuestion: 'Nibo ni o ti ta ọja rẹ?',
          locations: {
            farm: 'Bode-Oko',
            market: 'oja agbegbe',
            both: 'Mejeeji ẹnu-ọna oko ati ọja',
          },
          priceQuestion: 'Iye owo wo ni o gba fun?',
          spoiledProducesQuestion:
            'Melo ninu ohun ti o wa ni ibi ipamọ ni ọsẹ to kọja ti o bajẹ tabi ta ni isalẹ idiyele ọja apapọ?',
          spoilageReasonsQuestion: 'Kini idi pato ti o n fa idibajẹ irugbin?',
          formError: 'Jọwọ yan aṣayan kan',
        },
      },
      stringTemplates: {
        movementType: {
          checkOut: 'jade',
          checkIn: 'Wole sinu',
          checkedOut: 'Ti jade',
          checkedIn: 'ti wole',
        },
      },
    },
    MyOrders: {
      coolingFees: 'Cooling fees', // TODO
      soldFor: 'Sold for', // TODO
      ownedBy: 'Owned by', // TODO
      you: 'You', // TODO
      sort: {
        mostRecent: 'Most recent', // TODO
        oldest: 'Oldest', // TODO
        date: 'Date', // TODO
      },
      status: {
        'payment-pending': 'Payment Pending', // TODO
        'payment-expired': 'Payment Expired', // TODO
        cancelled: 'Cancelled', // TODO
        paid: 'Paid', // TODO
      },
      title: 'Order Overview', // TODO
      orderId: 'Order ID', // TODO
      cropType: 'Crop Type', // TODO
      coolingUnit: 'Cooling Unit', // TODO
      orderTotal: 'Order Total', // TODO
      backToTopButton: 'Back to the top', // TODO
    },
    ShoppingCart: {
      cartUpdatedMessage: 'Àwọn nkan kan ni a ti yọ kúrò nínú rírà rẹ nítorí wọn kò sí mọ́ láti rà.',
      ownership: 'Change cart ownership to {{name}}', // TODO
      changeOwnership:
        'Change the shopping cart ownership to {{name}}. This may affect the contents of your cart, including the possible removal of certain crates that might not be available after this change. Are you sure you want to proceed?', // TODO
      empty: 'Your cart is empty', // TODO
      daysLeft: 'days left', // TODO
      weight: 'KG available', // TODO
      perKg: '/ KG', // TODO
      totalToPay: 'Total to pay', // TODO
      pay: 'Pay', // TODO
      orderHeader: 'Order', // TODO
      subtotal: 'Subtotal', // TODO
      produce: 'Produce', // TODO
      discount: 'Discount', // TODO
      fees: 'Service fees', // TODO
      marketFees: 'Marketplace fee', // TODO
      paymentFees: 'Payment fee', // TODO
      coolingFees: 'Cooling fee', // TODO
      viewContacts: 'View contact(s)', // TODO
      contactsForDelivery: 'Contact(s) for delivery information', // TODO
      gotItButton: 'Got it!', // TODO
      pickupMethods: 'Pickup method', // TODO
      selectPickupMethod: 'Select a pickup method', // TODO
      selectPickupMethodInfo: 'A pickup method selection is required for each cooling unit.', // TODO
      pickupMethodSelectionMissing: 'Missing pickup method selection for {{amount}} cooling units.', // TODO
      pickUpToday: 'Pickup today', // TODO
      keepInStorageDailyRate: 'Keep in storage ({{price}} / day)', // TODO
      keepInStorageFixedRate: 'Keep in storage ({{price}})', // TODO
      delivery: 'Delivery', // TODO
      contactName: 'Contact name', // TODO
      phoneNumber: 'Phone number', // TODO
      thankYouMessage: 'Thank You for Ordering', // TODO
      orderOverview: 'Order overview', // TODO
      products: 'Products', // TODO
      consultOrders: 'Consult My Orders', // TODO
      total: 'Total', // TODO
      couponQuestion: 'Have a discount coupon?', // TODO
      redeem: 'Redeem code.', // TODO
      redeemCoupon: 'Redeem coupon', // TODO
      couponPlaceholder: 'E.g. 20OFF', // TODO
      discountsApplied: 'Discounts Applied', // TODO
      pickupModal: {
        today: 'Please pick up your order at {{company}}, located at {{location}} today.', // TODO
        storage:
          'Your crates are now being stored at {{company}}, located at {{location}}. Please pick up your order before {{ttpu}}.', // TODO
        delivery:
          "Please contact the available numbers to arrange delivery. You can see the list of delivery options under 'Order details'.", // TODO
      },
      errors: {
        invalid: 'Invalid value', // TODO
        minimumCartValue: 'Order must be at least ₦100.', // TODO
      },
      method: 'Method:', // TODO
      deliveryInfo:
        'Note that the delivery fee is dependant on the provider. If delivery is scheduled for tomorrow, a cooling fee of {{value}} will also be applied.', // TODO
      pickUpTodayInfo:
        'Please ensure you pick up your products by the end of the day to avoid any additional cooling fees.', // TODO
      keepInStorageInfo: 'The cooling fee will be applied when you pick up your order.', // TODO
      orderOverviewSubtitle:
        "You can revisit this information under the tab 'My Orders' in the 'Marketplace' screen.", // TODO
    },
    Analytics: {
      emptyState: 'Ko si data lati ṣafihan',
      company: 'Ile-iṣẹ',
      aggregated: 'Geerege',
      comparison: 'Ifiwera',
      downloadDataButton: 'Ṣe igbasilẹ data',
      users: 'Awọn olumulo',
      impact: 'Ipa',
      maleLabel: '👨🏽 Akọ: {{amount}}',
      femaleLabel: '👩🏽  abo: {{amount}}',
      otherLabel: 'Omiiran',
      usersTotal: 'Apapọ iye olumulo itutu to dangajia = {{amount}}',
      operatorsTotal: 'Apapọ iye olumulo = {{amount}}',
      beneficiariesTotal: 'Apapọ iye awọn ti ko je anfani taara = {{amount}}',
      totalCratesLabel: 'Apapọ awọn apoti',
      totalQuantityLabel: 'Apapọ opoiye (kg)',
      totalOperations: 'Apapọ awọn iṣẹ ṣiṣe',
      checkedInLabel: 'ti wole = {{amount}}',
      checkedOutLabel: 'Ti jade = {{amount}}',
      methodologyButton: 'Wo Ilana',
      farmersAnalytics: {
        coolingUserName: 'Orukọ olumulo Itutu',
        coolingUserType: 'Iru olumulo Itutu',
        avgStorageTime: 'Apapọ akoko ipamo',
        coldStorageCost: 'Iye owo ipamọ itutu',
        days: 'ojo pupo',
        baselineSurveyButton: 'Kun Awọn iwadi Ipilẹ',
        baseLineSurveyMessage: 'O ni awọn iwadi {{amount}} lati pari 😟',
        postCheckOutSurveyButton: 'Fọwọsi Awọn Iwadii Ṣiṣayẹwo Ifiranṣẹ',
        postCheckOutSurveyMessage: 'O ni awọn iwadi {{amount}} lati pari 😟',
        noChangeFoodLoss: 'Ko si iyipada ninu pipadanu ounjẹ',
        increaseInFoodLoss: 'Ilọsi pipadanu ounjẹ',
        decreaseInFoodLoss: 'Ilọkuro ninu pipadanu ounjẹ',
        increaseInRevenue: 'Alekun wiwọle',
        decreaseInRevenue: 'Dinku ni wiwọle',
        foodLossEvolution: '🥗 Itankalẹ ipadanu Ounjẹ fun irugbin kan (oke 5)',
        changePercentage: '% Yipada',
        crops: 'Awọn irugbin',
        foodLossLevels: 'Awọn ipele pipadanu ounjẹ',
        revenueEvolution: '💰 Iyipada owo-wiwọle apapọ',
        revenueCropEvolution: '💰 Iyipada owo-wiwọle apapọ fun irugbin na (oke 5)',
        noChangeRevenue: 'Ko si iyipada ninu wiwọle',
        revenueLevels: 'Awọn ipele wiwọle',
        baselineSurveyLabel: 'Iye awọn iwadi Ipilẹ ti o pari',
        postCheckoutSurveyLabel: 'Iye awọn iwadi Ipilẹ ti o pari leyin ijade',
        allPostCheckoutSurveysCompleted: 'Gbogbo awọn iwadi lẹhin isanwo ti pari 🤝',
        allBaselineSurveysCompleted: 'Gbogbo awọn iwadii Ipilẹ ti o pari',
      },
      companyTab: {
        usersTab: {
          employeesTotal: 'Apapọ iye osise tofi oruko sile = {{amount}}',
          usersType: 'Iru awọn olumulo itutu',
          farmersLabel: '🧑🏽‍🌾  Awon Agbe: {{amount}}',
          tradersLabel: '👩🏽‍💼 Awon Onisowo: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'Apapọ ibugbe ti itutu',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: 'iṣiporopo isonu Onje',
          revenueLabel: 'Iṣiporopo iye owo olumulo Itutu',
          co2Label: '💨 CO2e itusilẹ itankalẹ',
          surveysAmountLabel:
            'Iye. awọn iwadi ti a lo lati ṣe iṣiro pipadanu ounje ati isiporopo owo to wọle',
          co2Increase: 'Awọn itujade CO2e fun kg ti ọja pọ si pẹlu itutu agbaiye',
          co2Decrease: 'Awọn itujade CO2e fun kg ti ọja dinku pẹlu itutu agbaiye',
          co2WithoutCooling: 'Kg ti CO2e fun kg ti ọja ti o jade laisi itutu agbaiye',
          co2WithCooling: 'Kg ti CO2e fun kg ti ọja ti o jade pẹlu itutu agbaiye',
          from: 'Lati',
          to: 'Si',
        },
        downloadFileName: 'atupale-data',
        utilization: 'Lilo',
        goBackButton: 'Pada si akọkọ',
        companyNameLabel: 'Orukọ Ile-iṣẹ',
        revenueLabel: 'Apapọ ere owo to wole',
        coolingUnitsLabel: 'Nº ti Awọn ẹya itutu agbaiye',
        singleCoolingUnitContent: '1 ẹyọkan',
        coolingUnitsContent: '{{amount}} awọn ẹya',
        capacityLabel: 'Apapọ agbara itutu',
        capacityContent: '{{amount}} toonu metiriki',
        coolingUnitTypeLabel: 'iru eyọ Itutu',
        coolingUnitTypeMarket: '{{amount}} yara oja',
        coolingUnitTypeFarmGate: '{{amount}} yara ibode oko',
        coolingUnitTypeMovable: '{{amount}} Yara alagbeka',
      },
      tabsShared: {
        configurationMessage: 'Jọwọ tunto awọn ọjọ rẹ ati awọn ẹya itutu agbaiye lati ni iwọle',
        configureButton: 'se atunto',
        crates: 'awon kireeti',
        dateRangeLabel: 'Iwọn ọjọ',
        selectedUnitsLabel: 'Awon eyo itutu ti a ti yan',
        totalCo2Label: '💨 Apapọ CO2e ti a jade:',
        roomRevenue: 'owo to  wole un yara',
      },
      comparisonTab: {
        sortingLabel: 'Too',
        coolingUnit: 'iwon itutu',
        genderHeader: 'Okunrin | Obirin | Omiiran',
        genderSecondaryHeader: 'Okunrin | Obirin',
        total: 'Lapapọ',
        sortingMenuOptions: {
          descending: 'Sokale',
          ascending: 'Igoke',
          coolingUnitName: 'Orukọ Itutu agbaiye',
        },
        usersTab: {
          operators: 'Awọn oniṣẹ',
          users: 'Ti nṣiṣe lọwọ itutu awọn olumulo',
          activeUsers: 'Awọn olumulo ti nṣiṣe lọwọ',
          beneficiaries: 'Awọn anfani aiṣe-taara',
        },
        cratesTab: {
          crates: 'awon kireeti',
          kg: 'iwon kilogram',
          operations: 'Awọn iṣẹ ṣiṣe',
          checkedIn: 'ti wole',
          checkedOut: 'Ti jade',
          checkedInCropDistribution: 'Gbe pinpin irugbin wole (awọn apoti)',
          checkedInKgDistribution: 'Gbe pinpin irugbin wole (kg)',
          checkInCropDistribution: 'Ṣayẹwo-ni pinpin irugbin na',
          checkedOutCropDistribution: 'Gbe pinpin irugbin jade (awọn apoti)',
          checkedOutKgDistribution: 'Gbe pinpin irugbin jade (kg)',
          checkOutCropDistribution: 'Ṣayẹwo-jade pinpin irugbin na',
          co2: '💨 CO2e jade fun itutu agbaiye',
          co2EmissionsLabel: 'CO2e itujade (kg)',
          co2DistributionLabel: 'CO2e pinpin irugbin',
          co2Kg: 'Kg CO2 emitted', // TODO
        },
        impactTab: {
          occupancyLabel: 'Apapọ ibugbe ti itutu',
          occupancy: 'Ibugbe',
          foodLossLabel: 'iṣiporopo isonu Onje',
          revenueLabel: 'Iṣiporopo iye owo olumulo Itutu',
          changePercentage: '% Yipada',
          completePercentage: '% Pari',
          foodLossLevels: 'Awọn ipele pipadanu ounjẹ',
          revenueLevels: 'Awọn ipele wiwọle',
          revenuePerRoomLabel: '📈 Owo ti n wọle fun yara kan',
          co2Label: '💨 CO2e itusilẹ itankalẹ',
          surveysAmountLabel:
            'Iye. awọn iwadi ti a lo lati ṣe iṣiro pipadanu ounje ati isiporopo owo to wọle',
          co2EmissionsLabel: 'CO2e (kg)',
        },
      },
    },
    Notifications: {
      text: { notifications: 'Awọn itani lolobo' },
      sensorError:
        'Sensọ fun yara tutu {{unitName}} ko ti fi data kankan ranṣẹ ni awọn wakati 12 sẹhin. Jọwọ tẹ data sii pẹlu ọwọ titi ti yoo fi wa titi.',
      survey: 'Jọwọ fọwọsi iwadi ọja fun {{farmer}}, fun iṣipopada, {{movementCode}}.',
      link: 'Jọwọ lọ si ibi lati pari rẹ',
      coolingUserSurvey: 'O ti ṣayẹwo ni {{crop}} ṣugbọn iwọ ko pari iwadi fun irugbin na.',
      operatorSurvey:
        'O ti ṣayẹwo ni {{crop}} fun {{farmer}} ṣugbọn iwọ ko pari iwadi fun irugbin na.',
      pickup:
        'O yẹ ki o gbe awọn apoti {{crop}} rẹ ni kete bi o ti ṣee! (ṣayẹwo ni ọjọ: {{checkIn}}, ID itutu agbaiye: {{unitId}}, ṣayẹwo ni ID: {{movementCode}}).',
      notifyCoolingUser:
        'Jọwọ fi to olumulo {{farmer}} leti pe o yẹ ki o gbe awọn apoti rẹ ti {{crop}} ni kete bi o ti ṣee! (ṣayẹwo ni ọjọ: {{checkIn}}, ID itutu agbaiye: {{unitId}}, ṣayẹwo ni ID: {{movementCode}}).',
      checkIn: 'Oniṣẹ {{farmer}} ti ṣatunkọ ibi-iwọle {{movementCode}} ni {{date}}.',
      surveyAlreadyFilled: 'Iwadi ti kun tẹlẹ',
      orderRequiresMovement:
        'Awọn ọja nilo lati tun pinpin laarin awọn apoti. Tẹ fun awọn alaye lori awọn nkan ti o yẹ ki o gbe.',
      listingPriceUpdated:
        'Awọn owo ṣiṣe lọja fun awọn apoti ipamọ {{crop}} ni {{unitName}} ti ṣe imudojuiwọn: {{priceTag}}',
    },
  },
  tutorial: {
    welcome: 'Kaabo si Coldtivate. Eleyi jẹ kan Ririn ti awọn iṣẹ.',
    farmerWelcome:
      'Welcome to Coldtivate! This tutorial will help you understand how to use the app.', // TODO
    quit: 'jade kuro ninu idanilẹkọ',
    congratulations:
      'Idanilẹkọ! O ti pari ikẹkọ naa! Pada si dasibodu lati bẹrẹ lilo ohun elo naa.',
    prev: 'Igbesẹ ti tẹlẹ',
    next: 'Itele',
    start: 'Start Tutorial', // TODO
    final:
      'Congratulations! You have completed the tutorial! Go back to the dashboard to start using the app.', // TODO
    backToDashboard: 'Laghachi na Dashboard', // TODO
    steps: {
      openDrawer:
        'On the top left, you find a menu with the main functionalities. Go ahead and click it.', // TODO
      repeatTutorial: 'Ti o ba fẹ wo ikẹkọ yii lẹẹkansi, o tun le rii ninu akojọ aṣayan.',
      managementNavigation:
        'Ninu akojọ aṣayan, o le lilö kiri si taabu “Iṣakoso” ati pe o ṣafikun Awọn ipo tuntun, Awọn ẹya Itutu agbaiye, Awọn oṣiṣẹ ti o forukọsilẹ ati Awọn oniṣẹ.',
      operatorManagementNavigation:
        'In the Menu, you can navigate to "Management" and tap there to add or edit Cooling Users', // TODO
      addCoolingUser:
        'Awọn olumulo itutu ti ko forukọsilẹ lori Coldtivate ni a le ṣafikun nipasẹ fifi awọn alaye wọn sii (orukọ, nọmba foonu). Awọn olumulo itutu ti o forukọsilẹ tẹlẹ ninu ohun elo naa le ṣafikun nipasẹ koodu. Wọn le wa koodu wọn lori profaili wọn -> "Awọn alaye akọọlẹ" -> "Koodu agbewọle Olumulo Itutu".',
      navigateToCoolingUser: 'Go ahead and click the Cooling Users tab', // TODO
      listCoolingUsers:
        'Awọn olumulo itutu agbaiye pẹlu foonuiyara jẹ idanimọ nipasẹ aami foonu kan ni apa ọtun ti awọn iboju. Awọn miiran n tutu awọn olumulo pẹlu foonu ipilẹ kan. Ni awọn ọran mejeeji, o le tẹ orukọ kan lati wọle si awọn alaye wọn ati iwadii olumulo itutu agbaiye.',
      navigateToAddCoolingUser: "Clicking the '+' sign allows you to add a new Cooling User.", // TODO
      coolingUnitStep:
        'O le lọ kiri kọja awọn iwọn itutu agbaiye nipa tite lori akojọ aṣayan silẹ ni oke.',
      initiateCheckIn1:
        'Once you add a cooling user, you can make a check-in for that cooling user. Go ahead and click the activity button.', // TODO
      initiateCheckIn2: 'Now click on the check-in button (the one in green).', // TODO
      checkIn1:
        'To complete the check-in, you need to click on "Add Crates" and follow the instructions step by step. Click \'Continue\' to see what the result would look like.', // TODO
      checkIn2:
        'Lẹhin ti ntẹriba pari gbogbo awọn igbesẹ, o yoo ri ohun Akopọ ti awọn crates ti o ba wa nipa lati ṣayẹwo sinu yara.',
      checkIn3:
        'Ti o ba ni itẹlọrun, o le tẹ “Jẹrisi” ati pe awọn apoti tuntun yoo ṣafikun si Dasibodu naa.',
      history:
        'Clicking on "History", you can see all the movements in the room. The check-outs for which the after-storage survey has not been completed are marked by a red dot.', // TODO
      coolingUnits:
        'Tẹ “Awọn ẹya itutu agbaiye” lati rii agbara ti ẹyọ itutu agbaiye ni awọn ọjọ 7 to nbọ (Taabu Alakoso) ati iwọn otutu ti yara naa (taabu awọn ipo yara).',
      roomConditions:
        'O le ṣe imudojuiwọn iwọn otutu ti yara itutu agbaiye pẹlu ọwọ ni “awọn ipo yara” ti o ko ba ni sensọ ti o sopọ pẹlu ohun elo naa.',
      checkOut1:
        'Lati bẹrẹ ayẹwo-jade, tẹ lori bọtini aṣayan iṣẹ-ṣiṣe ati lẹhinna lori bọtini pupa. Lẹhinna tẹle awọn ilana lati pari ayẹwo-jade.',
      checkOut2: 'O le yan ẹyọ itutu agbaiye ati awọn irugbin ti o fẹ ṣayẹwo.',
      checkOut3: 'Ni kete ti awọn ohun kan ba san fun, tẹ lori bọtini oniwun ki o pari ayẹwo naa.',
      navigateToLocations:
        'The first thing you will need to do is add a location. Go ahead and click the locations tab.', // TODO
      locations:
        'You can add a location by selecting a name and adding its latitude and longitude, by sharing your GPS coordinates (if you are at the cold room location), or by typing the address.', // TODO
      navigateToCoolingUnits:
        'After a location has been added, you can add a cooling unit. Go ahead and click the cooling units tab.', // TODO
      addCoolingUnits:
        'A cooling unit can be added by completing the details above. If you have temperature sensors in the cooling unit and an API in place, you can input the credentials and automatically connect your sensors to the app.', // TODO
      addEmployeesOperators:
        'You can add Registered Employees and Operators through the Management screen. In order to add either role, you will need their phone number. They will receive an SMS with an invitation link. A phone number can be used for only one user.', // TODO
      employeeCoolingUnitsStep:
        'Once you have selected a cooling unit you will see an overview of: the crates currently in storage in the "Dashboard" tab, statistics about utilisation and impact in the "Analytics" tab, and the list of crates for sale in the "Marketplace" tab. Clicking on "More", you can also navigate to the "Crop Prices", "History", "Cooling Units", and "Orders" tab.', // TODO
      localizationPreferences:
        'You can change the language of the app by selecting "Localization Preferences". Make sure to click the "Save changes" button for the language to be changed!', // TODO
      accountDetailsNavigation:
        'In the menu, you can navigate to "Account Details" and tap there to view/edit a set of configurations related to your account. Go ahead and try it.', // TODO
      coolingUserSurvey:
        'Ni igba akọkọ ti o ṣii app, o beere lọwọ rẹ lati pari iwadi kukuru kan. O ṣe pataki pupọ pe ki o fọwọsi iwadi fun ohun elo naa lati pese fun ọ pẹlu awọn iṣeduro adani. Ti o ko ba le fọwọsi iwadi ni igba akọkọ ti o wọle, o le wọle si iwadi naa ni "Awọn alaye akọọlẹ" -> "Iwadii Olumulo Itutu". O ṣeun fun gbigba akoko lati pari iwadi naa!',
      coolingUserCode:
        'The first time you arrive at a cold room to store your produce, the operator will ask you to provide her / him with your personal code, to add you to the list of cold room users. You can find this code in "Personal details" -> "Cooling User Import Code".', // TODO
      knowledgeHub:
        'Ninu akojọ aṣayan, o le wa "Ile-iṣẹ Imọ", eyiti o ni imọran lori bii gigun awọn irugbin oriṣiriṣi le wa ni ipamọ, ati iwọn otutu to dara julọ. Ṣayẹwo rẹ lati ni oye iye ti yara tutu le ṣe iranlọwọ fun ọ lati ṣetọju didara awọn eso ati ẹfọ oriṣiriṣi!',
      faq: 'Ninu akojọ aṣayan, o tun le wa Awọn ibeere Nigbagbogbo (FAQ). A ṣeduro pe ki o ṣayẹwo wọn lati ni imọ siwaju sii nipa ohun elo naa ati anfani ti fifipamọ awọn ọja rẹ sinu awọn yara tutu.',
      dashboardStep1:
        'Ni kete ti oniṣẹ ba ti pari wiwa wọle fun ọ, iwọ yoo ni anfani lati wo awọn ọja ti o wa ni ibi ipamọ ninu yara ni apakan “Dashboard”. Gbogbo kaadi ni akojọpọ awọn apoti ti iru irugbin kanna ti a ṣayẹwo ni papọ.',
      dashboardStep2:
        'Kaadi kọọkan ninu dasibodu naa ni alaye nipa: iru irugbin na, nọmba awọn apoti ti a fipamọ, awọn ọjọ melo ti wọn ti fipamọ tẹlẹ, idiyele ojoojumọ (fun gbogbo awọn apoti papọ), ati ID ayẹwo-iwọle.',
      dashboardStep3:
        'Nọmba awọ ti awọn ọjọ tọkasi "Aago lati gbe soke" (TTPU), eyiti o tumọ si fun ọjọ melo ni ọja rẹ yoo dara fun, ti o ba wa ni firiji. Awọ pupa tumọ si pe awọn ọja n padanu didara rẹ ati pe o yẹ ki o mu ni kete bi o ti ṣee.',
      dashboardStep4:
        'Ti awọ kaadi ba jẹ ofeefee (ọjọ 2-5 osi) tabi alawọ ewe (diẹ sii ju awọn ọjọ 5), iwọ ko nilo lati ṣe aniyan nipa awọn apoti. Nọmba awọn ọjọ ni a tun ṣe iṣiro ni ọpọlọpọ igba fun ọjọ kan, nitorinaa rii daju lati ṣayẹwo “Dashboard” nigbagbogbo lati rii bi didara awọn apoti inu yara ṣe n dagbasi.',
      dashboardStep5:
        'Ti o ba ni awọn apoti ti a fipamọ sinu awọn yara pupọ, o le yi yara ti o nwo pada nipa yiyan ile-iṣẹ kan ati ẹyọ itutu agbaiye lati inu isọ silẹ.',
      dashboardStep6:
        'When your crates are approaching the Time to pick up and the card turns red, you will receive a notification that advises you to go to the room, pick up those crates, and sell them. You can check your notifications by clicking the bell on the right.', // TODO
      farmerHistory:
        'In the tab "History" you can see a summary of all check-ins and check-outs that you have completed in each room. If you see a red dot next to a check out, please click on the three dots and "Fill in market survey". Here, we would like to understand at what price you have sold your produce, and if anything got spoiled. We use this information to improve the operations at the cold room, so it is important that you answer accurately.', // TODO
      farmersCoolingUnits:
        'To check for cooling units near you, you can navigate to the buttons on the bottom of the screens, clicking on the tab "More", "Cooling units" and selecting "Map". By clicking on each pin on the map, you can see the type of unit and the price of storage.', // TODO
      farmersUnitsPlanner:
        'Ninu taabu "Awọn ẹya itutu agbaiye" o le wa maapu naa, ibugbe lọwọlọwọ ati ọjọ iwaju ti yara naa (ni “Aṣeto”) ati iwọn otutu ti yara naa (ni “Awọn ipo yara”). Awọn iboju wọnyi ṣe iranlọwọ fun ọ lati ṣe atẹle latọna jijin ohun ti n ṣẹlẹ ni awọn yara tutu, laisi nini lati lọ sibẹ ni eniyan lati ṣayẹwo!',
      marketPrice:
        'If you see a tab named "Crop Prices", you can check the prices of different fruits and vegetables across the country in the last days, and a forecast of the prices for the future. For now, this option is only available for selected countries.', // TODO
      farmerFinalStep:
        'Congratulations! You have completed the tutorial! If you have questions about the app, we recommend checking the FAQ, asking an operator of the cold room, or writing us at app@yourvcca.org.', // TODO
      more: 'Clicking on "More", you will be able to select the "History", "Crop Prices", "Cooling Units", and "Orders" screens.', // TODO
    },
  },
} satisfies Translations;
