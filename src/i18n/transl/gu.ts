import type { Translations } from './en';

export default {
  appVersion: {
    newVersion: 'કોલ્ડીવેટનું નવું વર્ઝન ઉપલબ્ધ છે!',
    pleaseUpdate: 'ચાલુ રાખતાં પહેલાં કૃપા કરીને ઍપ અપડેટ કરો.',
  },
  languages: {
    current: 'અંગ્રેજી',
    label: 'ભાષા',
    options: {
      en: 'અંગ્રેજી',
      hi: 'હિન્દી',
      or: 'ઉડિયા',
      gu: 'ગુજરાતી',
      fr: 'ફ્રેન્ચ',
      pt: 'પોર્ટુગીઝ',
      igbo: 'ઇગ્બો',
      yoruba: 'યોરૂબા',
      hausa: 'હાઉસા',
    },
  },
  gender: {
    female: 'સ્ત્રી',
    male: 'પુરુષ',
    other: 'અન્ય',
  },
  navigation: {
    error: {
      errorMessage: 'અરે... કંઈક ખોટું થયું હોય તેવું લાગે છે.',
      tryAgainMessage: 'કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.',
    },
    auth: {
      SignIn: 'લૉગ ઇન કરો',
      SignUp: 'સાઇન અપ કરો',
      ForgotPassword: 'પાસવર્ડ ભૂલી ગયા છો',
      PasswordReset: 'રીસેટ કરો',
      AppInfo: 'એપ્લિકેશન માહિતી',
      Logout: 'લૉગ આઉટ',
    },
    management: {
      Root: 'વ્યવસ્થાપન',
      CompanyDetails: 'કંપની વિગત',
      RevenueAnalysis: 'આવક વિશ્લેષણ',
      UsageAnalysis: 'ઉપયોગ વિશ્લેષણ',
      Locations: 'સ્થાનો',
      AddLocation: 'સ્થાન ઉમેરો',
      EditLocation: 'સ્થાન સંપાદિત કરો',
      CoolingUnits: 'કૂલિંગ યુનિટ્સ',
      DisabledCoolingUnitsDescription: 'ઓછામાં ઓછું એક સ્થાન ઉમેરો',
      CoolingUsers: 'કૂલિંગ યુઝર્સ',
      AddCoolingUser: 'કૂલિંગ યુઝરને ઉમેરો',
      EditCoolingUser: 'કૂલિંગ યુઝરને સંપાદિત કરો',
      AddCoolingUnit: 'કૂલિંગ યુનિટ ઉમેરો',
      EditCoolingUnit: 'કૂલિંગ યુનિટ સંપાદિત કરો',
      Operators: 'ઓપરેટરો',
      AddOperator: 'ઓપરેટર ઉમેરો',
      EditOperator: 'ઓપરેટરને સંપાદિત કરો',
      RegisteredEmployee: 'નોંધાયેલ કર્મચારી',
      AddRegisteredEmployee: 'નોંધાયેલ કર્મચારી ઉમેરો',
      RegisteredEmployeeDetails: 'નોંધાયેલ કર્મચારીની વિગત',
      DeliveryContacts: 'વિતરણ સંપર્કો',
    },
    bottomTabs: {
      RootMainTabStack: "{{firstName}}'s Coldtivate",
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'Marketplace settings', // TODO
      PriceTrend: 'કિંમતનો પ્રવાહ',
      PriceRanking: 'કિંમત રેન્કિંગ',
      Planner: 'પ્લાનર',
      RoomConditions: 'રૂમ શરતો',
      CratesInfo: 'ક્રેટ્સ માહિતી',
      Dashboard: 'ડેશબોર્ડ',
      History: 'ઇતિહાસ',
      MarketPrice: 'માર્કેટ કિંમત', // TODO
      CoolingUnits: 'કૂલિંગ યુનિટ્સ',
      Analytics: 'એનલિટિક્સ',
      CheckIn: 'ચેક-ઇન',
      CheckOut: 'ચેક-આઉટ',
      Maps: 'મૅપ્સ',
    },
    dashboard: {
      AccountDetails: 'ખાતાની વિગતો',
      PersonalDetails: 'વ્યક્તિગત વિગતો',
      LocalizationPreferences: 'સ્થાનિકીકરણ પસંદગીઓ',
      ContactsSharing: 'સંપર્ક વહેંચવું',
      Coupons: 'કૂપન',
      CouponsActiveTab: 'સક્રિય',
      CouponsRevokedTab: 'રદ થયેલ',
      Marketplace: 'બજાર',
      MarketplaceFilters: 'ફિલ્ટર્સ',
      MarketplaceAllTab: 'બધા',
      MarketplaceFavoritesTab: 'પ્રિય',
      Orders: 'ઓર્ડર',
      MyOrders: 'મારા ઓર્ડર',
      OrderDetails: '{{orderCode}}',
      KnowledgeHub: 'જ્ઞાન કેન્દ્ર',
      QuitTutorial: 'ટ્યુટોરિયલ છોડો',
      FAQ: 'વારંવાર પૂછવામાં આવતા પ્રશ્નો',
      About: 'મિત્રો',
      Management: 'બંને',
      Tutorial: 'ટ્યુટોરિયલ',
      PayoutOptions: 'પે-આઉટ વિકલ્પો',
      PaymentMethods: 'ચુકવણી પદ્ધતિઓ',
      Wallet: 'વાલેટ',
      Transactions: 'અરજીઓ',
      Transaction: '{{id}}',
      ShoppingCart: 'ખરીદી ગાડી',
    },
    checkIn: {
      SelectCropType: 'કૃષિ પ્રકાર પસંદ કરો',
      CheckIn: 'ચેક-ઇન',
      CropList: '{{cropType}}',
      CrateSetup: 'ચેક-ઇન',
      CrateWeightAndPricing: 'Crate weight and pricing', // TODO
    },
    about: {
      comsolAgreement: 'COMSOL રનટાઇમ લાઇસેન્સ સમજૂતિ 6.0',
      userLicense: 'અંતિમ યુઝર લાઇસેન્સ સમજૂતિ',
      aboutComsol: 'COMSOL વિશે',
      privacyPolicy: 'ગોપનીયતા નીતિ',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: '{{farmer}} માટેનો બજાર સર્વે',
      BaseSurvey: 'કૂલિંગ યુઝર સર્વે',
    },
    analytics: {
      methodology: 'વિદ્ધાન',
    },
  },
  actions: {
    error: 'એક ભૂલ થઈ ગઈ છે',
    cancel: 'રદ કરો',
    confirm: 'પષ્ટ કરો',
    import: 'આયાત કરો',
    yes: 'હાં',
    no: 'ના',
    select: 'ઍપ્લાય કરો',
    close: 'બંધ કરો',
    delete: 'ફારવું',
    ok: 'બરાબર',
    all: 'બધા',
    none: 'કોઈ નહીં',
    next: 'આગળ',
    back: 'પાછળ',
    search: 'શોધો...',
    or: 'અથવા',
    add: 'જોડવું',
    edit: 'સંપાદિત કરો',
    go: 'જાઓ!',
    done: 'સમાપ્ત',
    'not-available': 'ઉપલબ્ધ નથી',
    'complete-later': 'માટે પૂર્ણ કરો',
    'update-success': 'સફળતાપૂર્વક અપડેટ',
    'save-changes': 'પરિવર્તનો સાચવો',
    continue: 'જારી રાખો',
    save: 'સાચવો',
    update: 'સુધારો',
  },
  components: {
    datePicker: {
      clearButtonLabel: 'ક્લિયર',
      confirmButtonLabel: 'પષ્ટ કરો',
      placeholder: 'ડ્ડ/મ્મ/yyyy',
      startDateSelection: 'આરંભ તારીખ પસંદ કરો:',
      endDateSelection: 'અંતિમ તારીખ પસંદ કરો:',
    },
  },
  Auth: {
    welcomePopup:
      'Coldtivate માં આપનું સ્વાગત છે! જો તમે ખેડૂત, વેપારી છો અથવા કોલ્ડ રૂમમાં સંગ્રહિત ઉત્પાદનો ખરીદવામાં રસ ધરાવો છો, તો કૃપા કરીને \'ઠંડક વપરાશકર્તા અથવા ઉપભોક્તા તરીકે સાઇન અપ કરો\' પર ક્લિક કરીને નોંધણી કરો. જો તમે ઠંડક કંપનીમાં કામ કરો છો, તો તમારો જવાબદાર વ્યક્તિ સંપર્ક કરો અને તપાસો કે તમારી કંપની નોંધાયેલી છે કે કેમ. જો છે, તો તમારો જવાબદાર તમને નોંધાયેલા કર્મચારી અથવા ઑપરેટર તરીકે સાઇન અપ કરવા માટે SMS આમંત્રણ મોકલશે. જો નથી, તો તમે કંપની નોંધાવી શકો છો અને નોંધાયેલા કર્મચારી તરીકે નોંધણી કરી શકો છો. કૃપા કરીને "ઍપ માહિતી" વિભાગ તપાસો, જેમાં FAQ છે.',
    Root: {
      welcome: 'કોલ્ડટિવેટમાં આપનું સ્વાગત છે',
      signIn: 'સાઇન ઇન',
      signUpCompany: 'કંપની તરીકે સાઇન અપ કરો',
      signUpCoolingUser: 'ઠંડક વપરાશકર્તા અથવા ઉપભોક્તા તરીકે નોંધણી કરો',
      appInfo: 'એપ્લિકેશન માહિતી',
    },
    SignIn: {
      heading: 'સાઇન ઇન',
      accounts: {
        registeredEmployee: {
          label: 'રજિસ્ટર્ડ કર્મચારી',
          description:
            'ઠંડા કક્ષાના પ્રદાતા વ્યવસ્થાપન ટીમનો ભાગ. એક રજિસ્ટર્ડ કર્મચારી એપ્લિકેશનમાં કંપનીને નોંધણી કરી શકે છે અને અન્ય કર્મચારીઓને જોડવા માટે આમંત્રિત કરી શકે છે. રજિસ્ટર્ડ કર્મચારીઓ ઇમેઇલ અથવા ફોન નંબર દ્વારા લોગિન કરી શકે છે.',
        },
        operator: {
          label: 'ઓપરેટર',
          description:
            'ઠંડા કક્ષામાં શારીરિક રીતે હાજર અને તેના ચેક-ઇન, ચેક-આઉટ કામગીરીનું સંચાલન કરે છે. ઓપરેટરોને રજિસ્ટર્ડ કર્મચારીઓ દ્વારા કંપનીમાં જોડવા માટે આમંત્રિત કરી શકાય છે. ઓપરેટરો ફોન નંબર દ્વારા લોગિન કરી શકે છે.',
        },
        coolingUser: {
          label: 'કૂલિંગ યુઝર',
          description:
            'કોલ્ડ રૂમ વપરાશકર્તા અને ઉપભોક્તા. ખેડૂત, વેપારી, અને રિટેલર, જેમણે સ્માર્ટફોનનો ઍક્સેસ છે, તે અહીં લૉગ ઇન કરી શકે છે. જેમણે સ્માર્ટફોન નથી, તેવા કોલ્ડ રૂમ વપરાશકર્તા કોલ્ડ રૂમમાં જઈને અને ઑપરેટર સાથે સંપર્ક કરીને ઍપની માહિતી મેળવી શકે છે. ઉપભોક્તા અહીં લૉગ ઇન કરીને ખરીદી પૂર્ણ કરી શકે છે.',
        },
        toasts: {
          login:
            'યૂઝરનેમ અથવા પાસવર્ડ સહી નથી. કૃપા કરીને ખાતરી કરો કે તમે યોગ્ય વપરાશકર્તા ભૂમિકા પસંદ કરી છે',
          success: 'સફળતાપૂર્વક લોગિન થયું',
        },
      },
      form: {
        user: {
          placeholder: 'ઇમેઇલ/ફોન નંબર',
          description: {
            default: 'કૃપા કરીને માન્ય ફોન નંબર (દેશ કોડ સાથે) પ્રદાન કરો.',
            registeredEmployee: 'કૃપા કરીને માન્ય ઇમેઇલ/ફોન નંબર (દેશ કોડ સાથે) પ્રદાન કરો.',
          },
          messages: {
            default: 'ફોન નંબર જરૂરી છે.',
            registeredEmployee: 'ઇમેઇલ સરનામું અથવા ફોન નંબર જરૂરી છે.',
          },
        },
        password: {
          placeholder: 'પાસવર્ડ',
          messages: {
            required: 'પાસવર્ડ જરૂરી છે',
          },
        },
        actions: {
          logIn: 'લોગિન',
        },
      },
    },
    SignUp: {
      select: {
        header: 'એક {{fieldName}} પસંદ કરો',
        label: 'શોધો...',
        cancel: 'રદ કરો',
        ok: 'ઓકે',
      },
      welcome: 'Coldtivateમાં આપનું સ્વાગત છે',
      schema: {
        passwordError:
          'તમારા પાસવર્ડમાં ઓછામાં ઓછા 8 અક્ષરો હોવા જોઈએ, એક ઉન્નત અને એક નીચા કિસ્સા અક્ષર અને એક સંખ્યા હોવી જોઈએ.',
        confirmPasswordError: 'પાસવર્ડની પુષ્ટિ ફરજિયાત છે.',
        passwordsMismatchError: 'પાસવર્ડો મેળ ખાતા નથી.',
        countryError: 'દેશ પસંદ કરવો ફરજિયાત છે.',
        firstNameError: 'પ્રથમ નામ ફરજિયાત છે.',
        lastNameError: 'અંતિમ નામ ફરજિયાત છે.',
        phoneError: 'ફોન નંબર ફરજિયાત છે.',
        invalidPhoneError:
          'ફોન નંબર અમાન્ય છે. ખાતરી કરો કે ક્ષેત્ર કોડ સામેલ છે (ઉદાહરણ: +910000000000).',
        languageError: 'ભાષા ફરજિયાત છે.',
        genderError: 'લિંગ પસંદ કરવું ફરજિયાત છે.',
        termsError: 'તમે ઉપયોગની શરતો સાથે સંમત થવું જરૂરી છે.',
        companyError: 'કંપની નામ ફરજિયાત છે.',
        currencyError: 'મુદ્રા પસંદ કરવી ફરજિયાત છે.',
        emailError: 'ઇમેઇલ ફરજિયાત છે.',
        malformedEmailError: 'અમાન્ય ઇમેઇલ.',
      },
      commonForm: {
        firstNameLabel: 'પ્રથમ નામ',
        lastNameLabel: 'અંતિમ નામ',
        phoneLabel: 'ફોન નંબર (દેશ કોડ સાથે)',
        passwordLabel: 'પાસવર્ડ',
        confirmPasswordLabel: 'પાસવર્ડની પુષ્ટિ',
        countryFieldName: 'દેશ',
        genderFieldName: 'લિંગ',
        terms:
          'હું Coldtivate વપરાશકર્તા લાઇસન્સ કરાર, ગોપનીયતા નીતિ અને COMSOL ઉપયોગની શરતો સાથે સંમત છું',
        submit: 'સાઇન અપ',
      },
      SignUpCompany: {
        companyHeader: 'સાઇન અપ કંપની',
        userHeader: 'સાઇન અપ નોંધાયેલ કર્મચારી',
        companyNameLabel: 'કંપની નામ',
        emailLabel: 'ઇમેઇલ',
        currencyFieldName: 'મુદ્રા',
        modal: {
          warning: 'જો તમે ફોન વિના નોંધણી કરો છો, તો કેટલાક કાર્યક્ષમતાઓ કાર્યકર નહીં હોય:',
          reasons: {
            1: 'ખાતું પુનરિનિર્માણ',
            2: 'એસએમએસ મકબુલ',
          },
          buttons: {
            continue: 'પોતાં જ ચાલુ રાખો',
            addPhone: 'ફોન ઉમેરો',
          },
        },
      },
      SignUpCoolingUser: {
        header: 'ઠંડક વપરાશકર્તા અથવા ઉપભોક્તા તરીકે નોંધણી કરો',
        languageFieldName: 'ભાષા',
      },
      toasts: {
        error: 'Please ensure your details are accurate and try again', // TODO
      },
    },
    ForgotPassword: {
      heading: 'પાસવર્ડ ભૂલી ગયા',
      messageSentNotification:
        'જો ફોન નંબર અસ્તિત્વમાં છે, તો તમારા પાસવર્ડને રીસેટ કરવા માટે એસએમએસ મોકલવામાં આવ્યો છે.',
      instructions:
        'તમારા પાસવર્ડને રીસેટ કરવા માટે, કૃપા કરીને તે ફોન નંબર સાથે દેશ કોડ દાખલ કરો, જેના સાથે ખાતા જોડાયેલું છે.',
      phoneInputLabel: 'ફોન નંબર',
      resetButton: 'રીસેટ',
      link: {
        partOne: 'તમારા પાસવર્ડને રીસેટ કરવા માટે આ લિંક પર ક્લિક કરો {{baseLink}}',
      },
    },
    ResetPassword: {
      schema: {
        passwordError:
          'તમારું પાસવર્ડ ઓછામાં ઓછું 8 અક્ષરોનું હોવું જોઈએ, એક મોટું અક્ષર, એક નાનું અક્ષર અને એક આંકડો હોવો જોઈએ.',
        confirmPasswordError: 'પાસવર્ડ પુષ્ટિ ફરજિયાત છે.',
        passwordsMismatchError: 'પાસવર્ડ્સ મેલ ખાઈ રહ્યાં નથી.',
      },
      passwordLabel: 'નવી પાસવર્ડ',
      confirmPasswordLabel: 'પાસવર્ડ પુષ્ટિ કરો',
      resetButton: 'રીસેટ',
    },
    Invite: {
      heading: 'કોલ્ડટિવેટમાં આપનું સ્વાગત છે',
      employee:
        'તમે કર્મચારી તરીકે આમંત્રણ આપ્યું છે. કૃપા કરીને તમારું રજીસ્ટ્રેશન પૂરું કરવા માટે ફોર્મ ભરો.',
      operator:
        'તમે ઓપરેટર તરીકે આમંત્રણ આપ્યું છે. કૃપા કરીને તમારું રજીસ્ટ્રેશન પૂરું કરવા માટે ફોર્મ ભરો.',
      fields: {
        password: 'કમસેકમ આઠ અક્ષરો, એક મોટું અક્ષર, એક નાનું અક્ષર અને એક આંકડો.',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'તાપમાન ચેતવણી',
      subtitle:
        'અમે નોંધ્યું છે કે ત્યાં ફેરફાર થયો છે. આ તહેવાર માટે સ્ટોરેજમાં રહેલ માલમસાલા અહીં છે.',
      edit: 'શું તમે તાપમાન સુધારવા માગો છો?',
      temperature: 'તાપમાન',
      newTemperature: 'નવું તાપમાન',
      confirm: 'નવી તાપમાનની પુષ્ટિ કરો',
      continueWithoutUpdate: 'અપડેટ વિના આગળ વધો',
      sensorHint: 'તાપમાન ઉમેરવું શક્ય નથી કારણ કે એક સેન્સર કૂલિંગ યુનિટ સાથે જોડાયેલું છે.',
      latestTemperature: 'છેલ્લું તાપમાન {{date}} ના રોજ નોંધાયું હતું.',
    },
    emptyGeneral: 'હવે, ઉપલબ્ધ ડેટા નથી.',
    emptyCoolingUser:
      'સ્ટોરેજમાંના વસ્તુઓ ડેશબોર્ડમાં જોવા મળશે જો તમે કોઈપણ રૂમમાં ઓછામાં ઓછા એક ચેક-ઇન કરશો.',
    noCompanyAvailable: 'કોઈ કંપની ઉપલબ્ધ નથી',
    noCoolingUnitAvailable: 'કોઈ કૂલિંગ યુનિટ ઉપલબ્ધ નથી',
    noLocationsAvailable:
      'કોલ્ડટિવેટમાં આપનું સ્વાગત છે. મેનેજમેન્ટ પેનલમાં સ્થાન ઉમેરવાથી શરૂ કરો.',
    MarketPrice: {
      emptyState: 'તમારા દેશમાં બજારના ભાવ ઉપલબ્ધ નથી', // TODO
      commodityLabel: 'વસ্তু',
      commodityModalTitle: 'એક વસ્તુ પસંદ કરો',
      Trend: {
        title: 'દામની આગાહી માટે એક વસ્તુ અને એક રાજ્ય પસંદ કરો',
        emptyState: 'આ બજાર અને વસ્તુ સંયોજન માટે કોઇ માહિતી મળી શકી નથી',
        pastLabel: 'ભૂતકાળ',
        stateLabel: 'રાજ્ય',
        stateModalTitle: 'એક રાજ્ય પસંદ કરો',
        forecastLabel: 'આગામી આગાહી',
        chartLabel: 'દામ {{currency}}/કિલોગ્રામ',
      },
      Ranking: {
        filter: 'સ્થાન દ્વારા ફિલ્ટર કરો',
        monthLabel: 'માસ',
        monthModalTitle: 'માસ પસંદ કરો',
        stateModalTitle: 'રાજ્યો પસંદ કરો',
        stateLabel: 'રાજ્યો',
        table: {
          column1: 'રાજ્ય',
          column2: 'તારીખ',
          column3: 'દામ {{currency}}/કિલોગ્રામ',
          emptyState: 'કોઈ મૂલ્ય ઉપલબ્ધ નથી',
        },
      },
    },
    CrateManagement: {
      userModalTitle: 'એક કૂલિંગ યુઝર પસંદ કરો',
      addUserLink: 'યુઝર યાદીમાં નથી? મેનેજમેન્ટમાંથી યુઝરને ઉમેરો ➜ કૂલિંગ યુઝર્સ ➜ +',
      coolingUserLabel: 'કૂલિંગ યુઝર',
      selectCoolingUnitLabel: 'એક કૂલિંગ યુનિટ પસંદ કરો',
      coolingUnitLabel: 'કૂલિંગ યુનિટ',
      noUnitWarning: 'કૃપા કરીને એક કૂલિંગ યુનિટ પસંદ કરો',
      noCratesWarning: 'પસંદ કરેલો કૂલિંગ યુઝર આ કૂલિંગ યુનિટમાં કોઈ ક્રેટ્સ નથી',
      operationError: 'કિંવા થતો ભૂલ. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.',
      FarmerSurvey: {
        warningMessage: '{{crop}} માટે બેઝલાઇન સર્વે પૂર્ણ કરો!',
        modal: {
          weeklyQuantityQuestion: 'આપણે પ્રતિ સપ્તાહે કેટલા {{crop}} ઉછેરો અથવા વેચો?',
          cropSpoilageQuestion: 'ફસલ નાશ માટે મુખ્ય કારણ શું છે?',
          marketPriceQuestion: '{{crop}} વેચતી વખતે સરેરાશ બજાર ભાવ પ્રતિ સપ્તાહે કેટલું છે?',
          quantityDistributionQuestion: 'આમાંથી કેટલુ છે:',
          selfConsumed: 'સ્વભાવ ({{unit}})',
          sold: 'વેચાયેલું ({{unit}})',
          lost: 'ખોવાયેલું અથવા બજાર ભાવથી નીચે વેચાયેલું ({{unit}})',
          totalQuantity: 'પ્રતિ સપ્તાહે ઉત્પાદિત કુલ માત્રા',
          unitWeight: 'પ્રત્યેક {{crate}} છે',
          selectSpoilageReasonsPlaceholder: 'લાગુ થતું તમામ કારણો પસંદ કરો',
          priceLabel: 'ભાવ',
          priceUnit: 'પ્રતિ {{unit}}',
          commodityShortlist: 'વસ્તુની યાદી',
          unit: {
            kg: 'કિગ્રા',
            crates: 'કેસેસ',
            boxes: 'બોક્સ',
            sacks: 'બોરા',
            baskets: 'ટોકરાઓ',
            singular: {
              kg: 'કિગ્રા',
              crates: 'કેસ',
              boxes: 'બોક્સ',
              sacks: 'બોરા',
              baskets: 'ટોકરો',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'અસ્વસ્થ કાપણી અથવા હેન્ડલિંગ',
            inappropriateStorage: 'અયોગ્ય સંગ્રહ / જૂના સંગ્રહની અછત',
            overproduction: 'અતિઉત્પાદન',
            transportationDamage: 'પરિવહન નુકસાન',
            pest: 'કીટ',
            diseases: 'રોગો',
            weather: 'અતિશય આબોહવા સ્થિતિઓ',
            price: 'બજાર ભાવ ખૂબ ઓછું',
            other: 'અન્ય',
          },
          errorMessages: {
            number: 'એક સકારાત્મક સંખ્યા હોવી જરૂરી છે',
            reasonsForSpoilage: 'કૃપા કરીને ઓછામાં ઓછું એક કારણ રજૂ કરો.',
            totalMismatch:
              'સ્વભાવ, વેચાણ અને ખોવાયેલું અથવા બજાર ભાવથી નીચે વેચાયેલુંની કુલ માત્રા નકલી ગુણવત્તાની સાથે સરખી હોવી જોઈએ.',
            cropError: 'કૃપા કરીને એક commodity પસંદ કરો',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'આપણે દૂર કરવા માંગતા કરેટ્સ પસંદ કરો',
        selectAll: 'બધા પસંદ કરો',
        checkIn: 'ચેક-ઇન',
        days: 'દિવસ',
        daysLeft: '{{amount}} દિવસો બાકી',
        day: 'દિવસ',
        ttp: 'ટીટીપી',
        numberOfCrates: 'કરેટ્સની સંખ્યા',
        totalWeight: 'કુલ વજન',
        priceType: 'ભાવનો પ્રકાર',
        crate: 'કરેટ',
        pricePerProduct: 'પ્રતિ ઉત્પાદના ભાવ:',
        calculatedPrice: 'હિસાબ કરેલ ભાવ',
        discount: 'ડિસ્કાઉન્ટ',
        priceWithDiscount: 'કુલ ભાવ',
        bankTransfer: {
          title: 'પ્રાપ્તકર્તાના વિગતો',
          accountName: 'ખાતાના નામ',
          accountNumber: 'ખાતાનો નંબર',
          bankName: 'બેંકનું નામ',
        },
        paymentType: {
          label: 'ચુકવણી પ્રકાર',
          cash: 'કેશ',
          creditCard: 'ક્રેડિટ કાર્ડ',
          bankTransfer: 'બેંક ટ્રાન્સફર',
        },
        paid: 'ચુકવવામાં આવ્યું',
      },
      CheckIn: {
        emptyState: 'અજેમ બોક્સ્સ ઉમેરવામાં નથી આવ્યા',
        addCrates: 'કરેટ્સ ઉમેરો',
        checkInWithCode: 'કોડ સાથે ચેક-ઇન',
        estimatedCost: 'આનુમાનિત ખર્ચ',
        pricing: 'મૂલ્ય નિર્ધારણ',
        day: 'દિવસ',
        successMessage: 'કરેટ્સ સફળતાપૂર્વક ચેક-ઇન થયા છે',
        emptyMessage: 'કૃપા કરીને તમારું ચેક-ઇન કરાવવા માટે ઓછામાં ઓછી એક કરેટ ઉમેરો',
        noPlannedDaysMessage:
          'કોઈ વસ્તુઓમાં યોજિત દિવસો ગમાવવા માટે છે. આથી, અંદાજિત ખર્ચ ગણતરી કરી શકાતી નથી.',
        seeMore: 'વધુ જુઓ',
        seeLess: 'ઓછું જુઓ',
        listed: 'યાદીબદ્ધ',
        cratesAddedLabel: 'ટોપલીઓ ઉમેરવામાં આવી',
        WithCode: {
          modalTitle: 'મૌજુદા ચેક-આઉટથી નવો ચેક-ઇન બનાવવો',
          modalDescription:
            'આ રીતથી નવો ચેક-ઇન શરૂ કરવા માટે તમારે ચેક-આઉટ કોડની જરૂર પડશે. જો તમારું પાસે ન હોય, તો નવા ચેક-ઇન શરૂ કરવાનો વિચાર કરો. જો તમે કેટલો સમય સ્ટોર કરવાનું યોજના બનાવો છો, તો અહીં દિવસોની સંખ્યા ઉમેરવાની વિચારો.',
          codeLabel: 'કોડ ઉમેરો',
          codeErrorMessage: 'કોડ જરૂરી છે',
        },
        SelectCropType: {
          fruits: 'ફળ',
          vegetables: 'તરકારીઓ',
          rootVegetables: 'મૂળાં ની તરકારીઓ',
          other: 'અન્ય વસ્તુઓ',
        },
        SelectCrop: {
          additionalInfo: 'વધુ માહિતી',
        },
        Setup: {
          selectedCrop: 'ચોઇએલ કાંઠો',
          changeCropButton: 'ક crop ્રોપ બદલવા માટે અહીં ક્લિક કરો',
          individualCrateWeightButton: 'વ્યક્તિગત કરેટ વજન સુધારવા માટે અહીં ક્લિક કરો',
          individualCrateIdButton: 'વ્યક્તિગત કરેટ આઈડી સુધારવા માટે અહીં ક્લિક કરો',
          numberOfCratesLabel: 'કરેટ્સની સંખ્યા',
          crateWeightLabel: 'ક્રેટ વજન અને માર્કેટપ્લેસ સૂચિ',
          pricePerDayAndCrateLabel: 'દરેક દિવસ / કરેટની કિંમત',
          pricePerDayAndKilogramLabel: 'દરેક દિવસ / કિ.ગ્રા. ની કિંમત',
          fixedPriceLabel: 'ફિક્સ્ડ કિંમત',
          totalPriceLabel: 'કુલ કિંમત',
          plannedDaysLabel: 'સ્ટોરેજ માટે યોજિત દિવસોની સંખ્યા',
          harvestDateLabel: 'ક crop ્રોપ ક્યારે ખેડાય છે?',
          harvestDateValues: {
            today: 'આજ',
            yesterday: 'ગયા રોજ',
            dayBefore: 'બે દિવસ પહેલા',
            evenBefore: 'ત્યાં પહેલાં',
          },
          crateWeightAndPricing: {
            applyAll: 'બધાને લાગુ કરો',
            list: 'વેચાણ માટે યાદી',
            addMore: 'વધુ ઉમેરો',
            sellingPrice: 'વેચાણ માટેની કિંમતની યાદી',
            potentialSellingPrice: 'સમ্ভવિત વેચાણ મૂલ્ય',
            info: 'કિંમતની રચના ઉત્પાદનના વેચાણનો ઉદ્દેશ છે, ઠંડક સંગ્રહ શુલ્કનો નહીં.',
          },
          cratesError: 'કૃપા કરીને સકારાત્મક કરેટ સંખ્યા દાખલ કરો',
          crateWeightError: 'કૃપા કરીને સકારાત્મક કરેટ વજન દાખલ કરો',
          harvestDateError: 'હરવેસ્ટ તારીખ જરૂરી છે',
          modals: {
            weight: 'કરેટ્સનું વ્યક્તિગત વજન સેટ કરો',
            id: 'કરેટ્સનું વ્યક્તિગત આઈડી સેટ કરો',
            crateLabel: 'કરેટ',
            selectInitialId: 'કૃપા કરીને આરંભિક કરેટ આઈડી સેટ કરો',
            serialize: 'સિરીયલાઇઝ કરો',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: {
        label: 'કૂલિંગ યુનિટ: {{name}}',
        header: 'એક કૂલિંગ યુનિટ પસંદ કરો',
      },
      occupancy: 'કૂલિંગ યુનિટની હાલની ઓક્યુપન્સી',
      week: 'આ સપ્તાહ',
      today: 'આજ',
    },
    CoolingUnitsRoomConditions: {
      heading: 'તાપમાનનો ઇતિહાસ',
      temperature: 'તાપમાન',
      lastUpdated: 'અંતિમ અપડેટ {{date}}',
      enterTemperature: 'તાપમાન દાખલ કરો',
      toasts: {
        confirmation: 'તાપમાન સાચે જ બદલાયું',
      },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'સામાન',
      percentage: 'ટકાવારી',
      weight: 'વજન',
      crates: 'કરોડ',
      optimalTemp: 'ઉત્કૃષ્ટ તાપમાન (°C)',
      messages: {
        empty:
          'કૂલિંગ યુનિટ્સની ઘનતાને અને તાપમાનને અહીં દર્શાવવામાં આવશે જ્યારે તમે કોઈ પણ રૂમમાં ઓછામાં ઓછું એક ચેક-ઇન કરો છો.',
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'એક માલ ગેદર: {{crop}}',
      multiCommodity: 'બહુ-માલનો કક્ષ',
      publicMaker: 'જાહેર કૂલિંગ યુનિટ',
      usedMarker: 'તમે પહેલાથી જ ઉપયોગ કર્યો છે એવી કૂલિંગ યુનિટ',
    },
    Company: {
      SelectCompany: {
        label: 'કંપની: {{name}}',
        header: 'કંપની પસંદ કરો',
      },
    },
    ProduceDetails: {
      seeDetails: 'વિગતો જુઓ',
      kilogram: 'કિગ્રા',
      coolingUser: 'કૂલિંગ યુઝર',
      contact: 'સંપર્ક',
      contactCopied: 'કોપી થયું!',
      crates: 'ક્રેટ્સ',
      crate: 'ક્રેટ',
      cropType: 'પહેલાંના પ્રકાર',
      numberOfCrates: 'ક્રેટ્સની સંખ્યા',
      crateIds: 'ક્રેટ આઈડીઝ',
      combinedWeight: 'મિશ્રિત વજન',
      remainingTime: 'ઉપલબ્ધ સમય',
      currentStorageDays: 'હાલના સ્ટોરેજ દિવસો',
      plannedDays: 'યોજનાબદ્ધ દિવસો',
      pricePerDay: 'દિવસ દીઠ કિંમત',
      plannedStorageCost: 'યોજનાબદ્ધ સ્ટોરેજ ખર્ચ',
      pickUp: 'ઉઠાવવું',
      days: 'દિવસ',
      noDTMessage: 'આ ખાસ માલ માટે Shelf-life મોડલ ઉપલબ્ધ નથી.',
      checkOutButton: 'ચેક આઉટ',
    },
    SearchFilter: {
      detailsMessage:
        'કૃપા કરીને પાક પ્રકાર, ખેડૂતોનું નામ, સ્ટોરેજમાં દિવસો, સ્ટોરેજમાં બાકી દિવસો અથવા ચેક-ઇન કોડનો ઉપયોગ કરીને ચેક-ઇન શોધો',
      idMessage: 'ખાસ ક્રેટ ઓળખવા માટે વપરાતા ક્રેટ ID નંબરનો ઉપયોગ કરીને ક્રેટ શોધો',
      crateDetailsButton: 'ક્રેટ વિગતો શોધો',
      crateIdButton: 'ક્રેટ ID શોધો',
      searchLabel: 'શોધો',
    },
    SortMenu: {
      title: 'છાંટવો',
      options: {
        cropType: 'પાક પ્રકાર',
        timeToPick: 'ઉઠાવવાની વેળા',
        checkInDate: 'ચેક-ઇન તારીખ (પ્રથમથી છેલ્લું)',
        checkInDateReverse: 'ચેક-ઇન તારીખ (છેલ્લુંથી પ્રથમ)',
        coolingUser: 'કૂલિંગ યુઝરનું નામ',
      },
    },
    Management: {
      Delivery: {
        companyName: 'કંપનીનું નામ',
        companyNamePlaceholder: 'કંપનીનું નામ દાખલ કરો',
        companyNameError: 'કંપનીનું નામ દાખલ કરો',
        contactName: 'સંપર્કનું નામ',
        contactNamePlaceholder: 'સંપર્કનું નામ દાખલ કરો',
        contactNameError: 'સંપર્કનું નામ દાખલ કરો',
        phoneNumber: 'ફોન નંબર',
        phoneNumberPlaceholder: 'ફોન નંબર દાખલ કરો',
        emptyMessage: 'અત્યાર સુધી કોઇ સંપર્ક ઉમેરાયેલ નથી',
        deleteContactMessage: 'શું તમે ખરેખર આ સંપર્કને મિટાવા માંગો છો?',
        noAvailableContacts: 'આ ખાસ ઠંડા એકક માટે ઉપલબ્ધ કોઇ સંપર્કો નથી.',
        contactedAddedSuccessfully: 'સંપર્ક સફળતાપૂર્વક ઉમેરાયેલ.',
      },
      Location: {
        emptyState: 'હજી સુધી કોઈ સ્થળ ઉમેરવામાં આવ્યું નથી. ઉમેરવા માટે + ચિહ્ન પર ક્લિક કરો.',
        text: {
          invited: 'આમંત્રિત ({{amount}})',
          registered: 'પંજીકૃત ({{amount}})',
        },
        chips: {
          address: 'સરનામું',
          coordinates: 'કોఆોર્ડિનેટ્સ',
          geolocation: 'ફોન જીઓલોકેશન',
        },
        fields: {
          name: 'નામ',
          latitude: 'અક્ષાંશ',
          longitude: 'રેખાંશ',
          country: 'દેશ',
          state: 'રાજ્ય',
          city: 'શહેર',
          zipCode: 'પિનકોડ',
          street: 'સ્ટ્રીટ',
          streetNumber: 'સ્ટ્રીટ નંબર',
        },
        fieldErrorMessages: {
          latitude: 'Enter a number between -90 and 90 (e.g., 34.0522)', // TODO
          longitude: 'Enter a number between -180 and 180 (e.g., -118.2437)', // TODO
        },
        modal: {
          message:
            'આ ક્રિયા આ સ્થળ સાથે જોડાયેલ તમામ કૂલિંગ યુનિટ્સને કાઢી નાખશે. શું તમે આગળ વધવા માંગો છો?',
        },
        actions: {
          currentLocation: 'વર્તમાન સ્થાન પસંદ કરો',
        },
        toasts: {
          addLocationSuccess: 'સફળતાપૂર્વક સ્થળ ઉમેરાયું',
          editLocationSuccess: 'સફળતાપૂર્વક સ્થળ સંપાદિત થયું',
          removeLocationSuccess: 'સ્થાન {{name}} સફળતાપૂર્વક હટાવવામાં આવ્યું.',
          failedToFetchLocation:
            'Unable to retrieve the location. Please check the address and try again.', // TODO
          positionCancelled: 'Location request canceled.', // TODO
          positionUnauthorized: 'Location denied. Please grant permission to continue.', // TODO
          locationUnavailable: 'Location disabled. Please enable to continue.', // TODO
        },
      },
      Operators: {
        banner:
          'યુઝરને ઉમેર્યા પછી, તેમને એક આમંત્રણ લિંક સાથેનો એસએમએસ મળશે, જેના દ્વારા તેઓ તેમના ખાતાને સક્રિય કરી શકશે.',
        text: {
          gender: 'લિંગ',
          ma: 'પુરુષ',
          fe: 'સ્ત્રી',
          ot: 'અન્ય',
        },
        fields: {
          selectCoolingUnit: 'કૂલિંગ યુનિટ પસંદ કરો',
          coolingUnits: 'કૂલિંગ યુનિટ(ઓ)',
        },
        actions: {
          invite: 'આમંત્રણ કરો',
          save: 'ફેરફાર સાચવો',
        },
      },
      AddOperator: {
        messages: {
          operator: 'કૂલ્ટિવેટ એપ્લિકેશનમાં ઓપરેટર તરીકે જોડાવા માટે, જુઓ: {{link}}',
        },
        toasts: {
          error: 'Please check the information provided and try again', // TODO
          success: 'સફળતાપૂર્વક ઓપરેટર આમંત્રણ મોકલ્યું',
        },
        phoneFormat: 'જોડાવેલા ફોન નંબરમાં દેશ કોડ હોવો ચોક્કસ કરો.',
      },
      EditOperator: {
        toasts: {
          success: 'સફળતાપૂર્વક ઓપરેટર સંપાદિત',
        },
      },
      AddCoolingUser: {
        toasts: {
          add: 'કૂલિંગ યુઝર ઉમેરો',
        },
      },
      CompanyDetails: {
        labels: {
          name: 'નામ',
          uploadLogo: 'લોગો અપલોડ કરો',
          logo: 'લોગો',
          country: 'દેશ',
          commodity: 'વસ્તુ યાદી',
          currency: 'મુદ્રા',
        },
        headings: {
          country: 'દેશ પસંદ કરો',
          commodity: 'વસ્તુ પસંદ કરો',
          currency: 'મુદ્રા પસંદ કરો',
        },
        actions: {
          save: 'પરિવર્તનો સાચવો',
        },
        toasts: {
          success: 'સફળતાપૂર્વક સંપાદિત',
          photoLibrary: 'Permission Denied: Please enable access to your Photo Library.', // TODO
        },
      },
      RegisteredEmployee: {
        invited: 'આમંત્રણ આપવામાં આવ્યું ({{amount}})',
        registered: 'નામ નોંધાયું ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'તમારું ખાતું કાઢી નાખવા માટે, ખાતા વિગતોમાં જાઓ.',
        deleteOther: 'જો તમે આ ખાતું કાઢી નાખવા માગો છો, તો કૃપા કરીને {{contact}} ને સંપર્ક કરો.',
      },
      AddRegisteredEmployee: {
        message: 'Coldtivate એપ્લિકેશનમાં નોંધાયેલ કર્મચારી તરીકે જોડાવવા માટે, અહીં જાઓ: {{link}}',
        toasts: {
          success: 'સફળતાપૂર્વક નોંધાયેલા કર્મચારીને આમંત્રણ આપવામાં આવ્યું',
        },
      },
      CoolingUsers: {
        modals: {
          selectMethod: 'તમે કેવી રીતે વપરાશકર્તાને ઉમેરવું chcete?',
          userCode: 'વપરાશકર્તા કોડ દાખલ કરો',
          userCodeDesc:
            'જ્યારે તમે કૂલિંગ યૂઝર તરીકે નોંધણી કરો ત્યારે તમારા ખાતાની વિગતોમાં કોડ મળશે.',
          addByCode: 'કોડ દ્વારા વપરાશકર્તા ઉમેરો',
          addWithDetails: 'વિગતો સાથે વપરાશકર્તા ઉમેરો',
        },
        toasts: {
          notFound: 'આ વપરાશકર્તા કોડ સાથે કોઈ કૂલિંગ યૂઝર મળ્યો નથી.',
          taken: 'આ વપરાશકર્તા અગાઉથી તમારા કૂલિંગ યૂઝર્સની યાદીમાં છે.',
        },
      },
      EditCoolingUsers: {
        toasts: {
          warning:
            'આ ખાતું હટાવવામાં ન શક્ય છે કારણ કે આ વપરાશકર્તાની કૂલિંગ યુનિટ(s) {{names}} માં સક્રિય ચેક-ઇન્સ છે. કૃપા કરીને વપરાશકર્તાને સૂચિત કરો કે તેઓ રૂમમાં આવીને આ વસ્તુઓ ઉઠાવવી અને ચેક-આઉટ્સ પૂર્ણ કરવી જોઈએ પહેલા ખાતું કાઢી નાખવું!',
          confirmation:
            'શું તમે ખરેખર તમારા કૂલિંગ યુઝર્સની યાદીમાંથી આ વપરાશકર્તાને કાઢી નાખવા માંગો છો? આ પ્રક્રિયા આ કૂલિંગ યુઝરને કાઢી નાખશે અને પાછું મળી શકશે નહીં!',
          edit: 'કુલિંગ વપરાશકર્તાને સફળતાપૂર્વક સંપાદિત કર્યું',
          noCoolingUnits: 'તમારા પાસે હજુ કોઈ કૂલિંગ યુનિટ્સ નથી',
          updateSuccess: 'સફળતાપૂર્વક અપડેટ થયું',
        },
        pdf: {
          dateRange: 'તારીખ શ્રેણી',
          selectedUnits: 'આવકળવાં કૂલિંગ યુનિટ્સ',
          coolingUnit: 'કૂલિંગ યુનિટ',
        },
        actions: {
          downloadFarmers: 'કૃષકની ડેશબોર્ડ ડેટા ડાઉનલોડ કરો',
          completeLater: 'બાદમાં પૂર્ણ કરો',
        },
      },
      CoolingUnit: {
        emptyState: 'આ સ્થળે કોઈ કૂલિંગ યુનિટ્સ ઉમેરવામાં નથી. ઉમેરવા માટે + ચિહ્ન પર ક્લિક કરો.',
      },
      AddCoolingUnit: {
        heading: 'કૂલિંગ યુનિટ લક્ષણો',
        fields: {
          name: 'કૂલિંગ યુનિટ ID',
          location: 'સ્થાન',
          coolingUnitType: 'કૂલિંગ યુનિટને શ્રેષ્ઠ રીતે વર્ણવશે શું?',
          metricUnit: 'યૂનિટ',
          price: 'કિંમત',
          capacityInMetricTons: 'કુલ ખાલી જગ્યા',
          foodCapacityInMetricTons: 'ખોરાકનો મહત્તમ આકાર',
          roomSizeHeading: 'કૂલિંગ યુનિટ કદ',
          length: 'લંબાઈ',
          width: 'પહોળાઈ',
          height: 'ઉંચાઈ',
          weight: 'વજન',
          roomInsulator: 'ઇન્સ્યુલેટર',
          capacityInNumberCrates: 'મહત્તમ ક્રેટની સંખ્યા',
          crateWeight: 'કરેલાંનો ધોરણ વજન',
          crateSizeHeading: 'મર્યાદિત કરેલાંના કદ',
          editableCheckins: 'ઓપરેટરો દ્વારા ચેક-ઇનને સંપાદિત કરી શકો છો',
          sensorAvailable: 'સેન્સર ઉપલબ્ધ',
          public:
            'તમે તમારા કૂલિંગ યુનિટને સંભવિત કૂલિંગ વપરાશકર્તાઓ માટે વિઝિબલ બનાવવા માંગો છો (સ્થાન, રૂમનો પ્રકાર, ક્ષમતા અને કિંમતોની માહિતી)?',
          crops: 'કમોડિટીસ',
          selectCrops: 'કમોડિટીસ પસંદ કરો',
          refrigerantType: 'વપરાયેલી રેફ્રિજન્ટનો પ્રકાર',
          amountRefrigerant: 'રેફ્રિજન્ટની માત્રા',
          powerConsumptionInMt: 'એક મેટ્રિક ટન માટે કૂલિંગ યુનિટની વીજ ઉપભોગ',
          dailyRoomWattage: 'દૈનિક રૂમ વોટેજ',
          powerSource: 'કૂલિંગ યુનિટને કેવી રીતે પાવર કરવામાં આવે છે?',
          powerSourceDieselConsumptionKwh: 'જેનરેટર દ્વારા ડીઝલનો ઉપભોગ પ્રતિ kWh',
          pvPanelType: 'PV પેનલનો પ્રકાર',
          pvPanelCount: 'PV પેનલની સંખ્યા',
          pvPanelSize: 'એક પેનલનો કદ',
          pvPanelWeight: 'એક પેનલનું વજન',
          pvPanelMaxPower: 'એક પેનલની મહત્તમ શક્તિ',
          powerSourceDieselPercent: 'ડીઝલ જનરેટર',
          powerSourceGridPercent: 'ગ્રિડ',
          powerSourcePvPercent: 'PV પેનલ',
          powerSourceBiomassPercent: 'બાયોમાસ',
          electricityStorageSystem: 'વિદ્યુત સંગ્રહ સિસ્ટમ',
          thermalStorageMethod: 'થર્મલ સંગ્રહ પદ્ધતિ',
          batteryCount: 'બેટરીઓની સંખ્યા',
          batteryWeight: 'બેટરીનું કદ',
          batteryCapacity: 'એક બેટરીની ક્ષમતા',
          batteryMaxCurrent: 'એક બેટરીની મહત્તમ ચાર્જિંગ કરંટ',
          batteryPeakEnergyStorage: 'એક બેટરીની પીક એનર્જી સંગ્રહ',
          batteryType: 'બેટરીનો પ્રકાર',
          selectSensorType: 'સેન્સરનો પ્રકાર પસંદ કરો',
          addTempSensor: 'તમારા કૂલિંગ યુનિટમાં તાપમાપક સેન્સર ઉમેરો',
          sensorDesc: {
            default: 'જો તમારા હાથમાં નથી, તો તમારા સેન્સર પ્રદાતા પાસેથી આ માહિતી વિનંતી કરો.',
            ubibot: 'આ માહિતી તમારા ઉબિબોટ ખાતામાં શોધો.',
          },
          ecozen: {
            username: 'વપરાશકર્તાનું નામ',
            password: 'પાસવર્ડ',
            machineId: 'મશીન ID',
          },
          ubibot: {
            accountKey: 'ખાતાના કી',
            channelId: 'ચેનલ ID',
            sensorFieldTitle: 'તમારા સેન્સર ફિલ્ડને પસંદ કરો',
            sensorFieldDesc: 'તમારા સેન્સર ફિલ્ડને પસંદ કરો',
            field: 'ફિલ્ડ',
          },
          figorr: {
            apiKey: 'API કી',
            deviceTag: 'ડિવાઇસ ટેગ',
          },
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: 'તે એક ખેડૂતના દ્વાર પર રાખવામાં આવેલ સ્ટોરેજ રૂમ છે',
          MARKET_STORAGE_ROOM: 'તે એક બજાર પર રાખવામાં આવેલ સ્ટોરેજ રૂમ છે',
          MOVABLE_UNIT: 'તે એક ચલણશીલ યુનિટ છે (ઉદાહરણ તરીકે, એક રિફ્રિજેટેડ ટ્રક)',
          OTHER: 'અન્ય',
        },
        pricing: {
          label: 'કિંમત પ્રકાર',
          PERIODICITY: 'દિન પ્રતિ',
          FIXED: 'સ્થિર',
          day: 'દિન',
        },
        metricUnit: {
          label: 'યૂનિટ',
          KILOGRAMS: 'કિગ્રા',
          CRATES: 'કરે',
        },
        toasts: {
          addSuccess: 'સફળતાપૂર્વક કૂલિંગ યુનિટ ઉમેરવામાં આવ્યું',
          integrationError:
            'સેન્સર સાથે જોડાણ કરવામાં અસમર્થ. તમારા માહિતીનું માન્યકરણ કરો અથવા તમારા સેન્સર પ્રદાતાની સાથે સંપર્ક કરો.',
          integrationSuccess: 'સેન્સર ક્રેડેન્શિયલ્સ સફળતાપૂર્વક માન્ય કરવામાં આવ્યા.',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            'આ પ્રક્રિયા આ ઠંડક એકમને તેના ઇતિહાસ સહીત કાઢી નાખશે. શું તમે ચાલુ રાખવા માંગો છો?',
        },
        buttons: {
          viewExisting: 'હાલની જોવા માટે',
          editPricing: 'મૂલ્ય સંપાદિત કરો',
        },
        toasts: {
          editSuccess: 'ઠંડક એકમ સફળતાપૂર્વક સંપાદિત થયું',
          cantDelete: 'આ ઠંડક એકમને કાઢી નાંખી શકાયું નથી કારણ કે તેમાં સક્રિય ચેક-ઇન્સ છે.',
          successDelete: 'ઠંડક એકમ {{name}} સફળતાપૂર્વક કાઢી નાખવામાં આવ્યું.',
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'દિવસો પસંદ કરો:',
        empty: 'કોઈ રૂમમાં ચેક-ઇન કર્યા પછી ડેશબોર્ડમાં ચેક-ઇન અને ચેક-આઉટ દેખાશે.',
        downloadDataButton: 'ડેટા ડાઉનલોડ કરો',
        modal: {
          title: 'સંરચના સેટ કરો',
          coolingUnitSelection: 'કૂલિંગ યુનિટ પસંદ કરો:',
        },
        summary: {
          totalCheckIns: 'કુલ ચેક-ઇન સંખ્યા:',
          totalCrates: 'કુલ ક્રેટની સંખ્યા:',
          totalWeight: 'કુલ વજન:',
          totalUsers: 'કુલ વિવિધ વપરાશકર્તાઓની સંખ્યા:',
          weightUnit: 'કિગ્રા',
        },
      },
      RevenueAnalysis: {
        summary: {
          total: 'કુલ આવક',
        },
        paymentType: {
          label: 'ચૂંટો ચૂકવણીની રીતો:',
          cash: 'નકદ',
          creditCard: 'ક્રેડિટ કાર્ડ',
          bankTransfer: 'બેંક ટ્રાન્સફર',
        },
      },
      Coupons: {
        emptyMessage: 'અત્યાર સુધી કોઇ કૂપન ઉમેરાયેલ નથી',
        addCoupon: 'કૂપન ઉમેરો',
        code: 'કૂપન કોડ',
        percentage: 'કૂપન ટકા',
        revokeTitle: 'કૂપન રદ કરવું',
        revoke: 'રદ કરો',
        revokeMessage:
          'શું તમે ખરેખર આ કૂપન રદ કરવા માંગો છો? એક વખત રદ કરવામાં આવે પછી, તે ફરીથી ઉપયોગમાં લેવામાં આવી શકાતું નથી અને છૂટનો લાભ ઉપલબ્ધ નહીં હોય. આ ક્રિયા કાયમી છે અને પાછા લેવામાં નહીં આવે.',
      },
    },
    Marketplace: {
      sorting: {
        priceAsc: 'કીમત ચઢતી',
        priceDesc: 'કીમત ઉતરતી',
        nearMe: 'મને નજીક',
      },
      priceConfig: 'કીમત રૂપરેખાંકન ઉત્પાદની વેચાણને સંબંધિત છે, કૂલિંગ સ્ટોરેજ ફી સાથે નહીં.',
      addToCart: {
        addToCartButton: 'કાર્ટમાં ઉમેરો અને ખરીદી ચાલુ રાખો',
        selectQuantity: 'જાતીયતા પસંદ કરો',
        buyNowButton: 'હવે ખરીદો',
      },
      currentLocation: 'વર્તમાન સ્થાન',
      filterError:
        'કંઈક ખોટું થયું. કૃપા કરીને ટાઈપો તપાસો અને ખાતરી કરો કે દાખલ કરેલ શહેર નાઈજેરિયામાં આવેલું છે.',
    },
    AccountDetails: {
      popups: {
        default: 'શું તમે તમારા ખાતાને હટાવવા માટે પકવ છો?',
        lastRegisteredEmployee:
          'તમે કંપનીમાં એકમાત્ર નોંધાયેલા કર્મચારી છો, આ ક્રિયા તમારી કંપનીને કાઢી નાંખશે!',
        activeCheckInOP:
          'તમારા સોંપાયેલા કૂલિંગ યુનિટ(s) {{names}} માં સક્રિય ચેક-ઇન્સ છે અને તમે તે કૂલિંગ યુનિટમાં છેલ્લો ઓપરેટર છો. તમારું ખાતું કાઢી નાખવા પહેલાં તમામ ઉત્પાદન ચેક-આઉટ કરો અથવા નોંધાયેલા કર્મચારીને અલગ ઓપરેટર સોંપવા માટે સૂચિત કરો!',
        activeCheckInRE:
          'જો તમે કંપનીમાં એકમાત્ર નોંધાયેલ કર્મચારી છો અને કેટલીક કૂલિંગ યુનિટ્સમાં સક્રિય ચેક-ઇન્સ છે, તો તમે તમારું ખાતું કાઢી શકતા નથી, કારણ કે આ ક્રિયા તમારી કંપનીને કાઢી નાખશે. કૃપા કરીને ખાતરી કરો કે કૂલિંગ યુનિટ(s) {{names}} માંના તમામ સક્રિય ચેક-ઇન્સ ચેક-આઉટ કરવામાં આવ્યા છે.',
        activeCheckInCU:
          'તમે તમારું ખાતું કાઢી નાકી શકતા નથી કારણ કે તમે કૂલિંગ યુનિટ(s) {{names}} માં સક્રિય ચેક-ઇન્સ ધરાવ છો. કૃપા કરીને આ વસ્તુઓને ચેક-આઉટ કરો, પછી તમારું ખાતું કાઢી નાખવા માટે ફરીથી પ્રયાસ કરો!',
      },
      fields: {
        location: 'સ્થાન',
        userCode: 'કૂલિંગ યૂઝર આયાત કોડ',
      },
      toasts: {
        success: 'સફળતાપૂર્વક અપડેટ થયું',
      },
      sections: {
        sellerSettings: 'વિક્રેતા સેટિંગ્સ',
        buyerSettings: 'ખરીદદાર સેટિંગ્સ',
        details: 'વિગતવાર',
      },
      ContactsSharing: {
        publicPhone: 'ફોન નંબર જાહેર કરો',
        publicEmail: 'ઈ-મેઇલ જાહેર કરો',
      },
      PayoutSettings: {
        addTitle: 'કૃપા કરીને તમારી બેંક એકાઉન્ટની માહિતી દાખલ કરો',
        editTitle: 'તમારી બેંક એકાઉન્ટની માહિતી',
        form: {
          nameLabel: 'એકાઉન્ટનું નામ',
          namePlaceholder: 'એકાઉન્ટનું નામ દાખલ કરો',
          accountNumberLabel: 'એકાઉન્ટ નંબર',
          accountNumberPlaceholder: 'એકાઉન્ટ નંબર દાખલ કરો',
          countryLabel: 'દેશ',
          nigeria: 'નાઇજીરિયા',
          selectBank: 'મૂળક લિસ્ટમાંથી બેંક પસંદ કરો',
          bank: 'બેંક',
          accountType: 'એકાઉન્ટનો પ્રકાર',
          selectAccountType: 'એકાઉન્ટનો પ્રકાર પસંદ કરો',
          accountTypes: {
            personal: 'વ્યક્તિગત',
            business: 'વ્યાપાર',
          },
          errors: {
            accountName: 'એકાઉન્ટનું નામ આવશ્યક છે',
            account: 'એકાઉન્ટ નંબર આવશ્યક છે',
            accountType: 'એકાઉન્ટનો પ્રકાર આવશ્યક છે',
            bank: 'બેંકની પસંદગી આવશ્યક છે',
          },
        },
        successMessage: 'બેંક એકાઉન્ટ સફળતાપૂર્વક ઉમેરાયું.',
        errorMessage: 'કંઇક ખોટું થયું. કૃપા કરીને પછી ફરી પ્રયાસ કરો.',
      },
      PaymentSettings: {
        cards: 'કાર્ડ્સ',
        creditCard: {
          predefined: 'પૂર્વ નક્કી કરેલ',
          owner: 'કાર્ડ ધારકનું નામ',
          date: 'સમાપ્ત તારીખ',
          cvv: 'સિવીવિવી',
        },
        AddCreditCard: {
          title: 'કૃપા કરીને તમારા કાર્ડની માહિતી દાખલ કરો',
          form: {
            cardName: 'કાર્ડનું નામ',
            cardNamePlaceholder: 'કાર્ડનું નામ દાખલ કરો',
            cardNumber: 'કાર્ડ નંબર',
            cardNumberPlaceholder: 'કાર્ડ નંબર દાખલ કરો',
            expiryDate: 'સમાપ્તિ તારીખ',
            securityCode: 'સુરક્ષા કોડ',
            securityCodePlaceholder: 'કાર્ડનો સુરક્ષા કોડ દાખલ કરો',
            predefinedMethod: 'પૂર્વનિર્ધારિત ચુકવણી પદ્ધતિ',
            successMessage: 'કાર્ડ સફળતાપૂર્વક ઉમેરાયું',
            cardNameError: 'કાર્ડનું નામ જરૂરી છે',
            cardNumberError: 'કાર્ડ નંબર જરૂરી છે',
            securityCodeError: 'સિક્યુરિટી કોડ જરૂરી છે',
          },
        },
      },
    },
    About: {
      runtimeAgree: 'કમ્સોલ રનટાઇમ સોદા',
      userLicense: 'અંતિમ ઉપયોગકર્તા લાયસન્સ સોદા',
      privacyPolicy: 'ગોપનીયતા નીતિ',
      comsolAbout: 'કમ્સોલ વિશે',
    },
    KnowledgeHub: {
      comic: 'કૃષકની યાત્રા: કોમિક સ્ટ્રીપ',
      cooling: 'કુલિંગ-એઝ-એ-સેવા શું છે?',
      quality: 'ફસલની ગુણવત્તા કેવી રીતે સુધારવી',
      optimal: 'બહુ-વસ્તુ ઠંડા રૂમમાં ઉત્તમ સંગ્રહ પરિસ્થિતિઓ',
      table: 'ફસલ સંગ્રહ કોષ્ટક',
      sensors: 'તાપમાન સેન્સર અને સમય-ટુ-પિક-અપ મોડેલ',
      tips: 'ક્રેટ્સને ચેક-ઇન કરવાની સલાહ',
      glitches: 'ઠંડા રૂમમાં ટેકનિકલ ગ્લિચ્સનો પ્રતિસાદ કેવી રીતે આપવો',
      source: 'મૂળ: વધુ માહિતી માટે ઓપરેટરોના મેન્યુઅલને હસ્તગત કરો:',
      clickHere: 'અહીં ક્લિક કરો',
    },
    History: {
      priceLabel: 'કિંમત',
      empty:
        'ડેશબોર્ડ પર ચેક-ઇન અને ચેક-આઉટ ત્યારે જ દેખાશે જ્યારે તમે કોઈપણ રૂમમાં ઓછામાં ઓછો એક ચેક-ઇન કરશો.',
      sortMenuOptions: {
        cropType: 'ફસલ પ્રકાર',
        movementDate: 'ચલન તારીખ (પ્રથમથી છેલ્લું)',
        movementDateReverse: 'ચલન તારીખ (છેલ્લેથી પ્રથમ)',
        checkInFirst: 'પ્રથમ ચેક-ઇન',
        checkOutFirst: 'પ્રથમ ચેક-આઉટ',
        coolingUser: 'કુલિંગ યૂઝરના નામ',
      },
      optionsMenu: {
        common: {
          pdfReceipt: 'PDF રસીદ ડાઉનલોડ કરો',
        },
        checkOut: {
          seeDetails: 'વિગતો જુઓ',
          smsReceipt: 'SMS રસીદ ડાઉનલોડ કરો',
          marketSurvey: 'બજાર સર્વે પૂર્ણ કરો',
        },
        checkIn: {
          edit: 'ચેક-ઇન સંપાદિત કરો',
        },
      },
      detailsModal: {
        operatorNameLabel: 'ચેક-આઉટ ઓપરેટરનું નામ',
        operatorNumberLabel: 'ચેક-આઉટ ઓપરેટર નંબર',
        checkOutDateLabel: 'ચેક-આઉટ તારીખ',
        marketSurveyLabel: 'બજાર સર્વે પૂર્ણ થયું',
        cratesLabel: 'ક્રેટ્સ',
        combinedWeightLabel: 'કુલ વજન',
        paymentMethodLabel: 'ચુકવણી પદ્ધતિ',
        cropTypeLabel: 'ફસલ પ્રકાર',
        checkInCodeLabel: 'ચેક-ઇન કોડ',
        crateIdsLabel: 'ક્રીટ આઇડી',
      },
      pdfModal: {
        coolingUserLabel: 'કુલિંગ યૂઝર',
        dateLabel: 'તારીખ',
        weightLabel: 'વજન (કિગ્રા)',
        downloadButton: 'ઇન્વોઇસ ડાઉનલોડ કરો',
        downloadName: '{{code}}-receipt',
        successMessage: 'રસીદ ડાઉનલોડ થઈ ગઈ છે!',
        errorMessage: 'કેટલાક સમસ્યાઓ આવી ગઈ છે. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.',
        checkOut: {
          title: 'કંપની',
          checkOutLabel: 'ચેક-આઉટ કોડ',
          idLabel: 'આઈડી',
          itemLabel: 'આઇટમ',
          calculatedPriceLabel: 'હિસાબથી માનેેલા ભાવ',
          discountLabel: 'ડિસ્કાઉન્ટ',
          totalPrice: 'કુલ ભાવ',
        },
        checkIn: {
          title: 'ચેક-ઇન રસીદ',
          operatorLabel: 'ઓપરેટર',
          codeLabel: 'ચેક-ઇન કોડ',
          companyLabel: 'કંપની',
          coolingUnitLabel: 'કુલિંગ યુનિટ',
          priceLabel: 'કિંમત {{currency}} / દિવસ',
          cropLabel: 'ફસલ',
          numberOfCratesLabel: 'ક્રીટ્સની સંખ્યા',
          totalLabel: 'કુલ',
        },
      },
      editCheckIn: {
        contactLabel: 'સંપર્ક',
        coolingUserLabel: 'કુલિંગ યૂઝર',
        disclaimer: 'અખબારી: પિકઅપનો સમય અંદાજિત દિવસોનો હોય છે.',
        disclaimerMessage:
          'અખબારી: નોંધો કે પિકઅપનો સમય અંદાજિત દિવસોનો હોય છે. આ અંદાજ ફળ અથવા શાકભાજી જાતિ માટે પ્રોગ્રામ કરાયેલા મોડેલ અને ગણિતીય સિમ્યુલેશન પર આધારિત છે. યથાર્થ ગુણવત્તા પણ સ્થાનિક હવામાન, વૃદ્ધિ શરતો, સંગઠન તારીખ અને અન્ય પર આધાર રાખે છે. તેથી, આપણી અંદાજિત પિકઅપ દિવસોમાં વિમુખતા બની શકે છે.',
        selectCropLabel: 'એક ફસલ પસંદ કરો',
        successMessage: 'ચેક-ઇન સફળતાપૂર્વક અપડેટ કરાયેલું!',
        errorMessage: 'ચેક-ઇન અપડેટ કરવામાં નિષ્ફળ. કૃપા કરીને ફરીથી પ્રયાસ કરો.',
      },
      survey: {
        fillMessage: 'કૃપા કરીને {{crop}} માટે મૂળ સર્વે પૂર્ણ કરો!',
        baseSurvey: {
          occupationQuestion: 'તમને કઈ રીતે વ્યાખ્યાયિત કરી શકાય?',
          occupationFarmer: 'એક ખેડૂત',
          occupationTrader: 'એક નાનો વેપારી/વેપારી/હોલસેલર',
          usageQuestion: 'શું તમે ભૂતકાળમાં ઠંડા રૂમનો ઉપયોગ કર્યો છે?',
          newUser: 'નહીં, હું એક નવા વપરાશકર્તા છું',
          oldUser: 'હા, મેં ઠંડા રૂમનો ઉપયોગ કર્યો છે',
          mostUsedCommoditiesQuestion: 'સૌથી વધુ ખેંચાયેલું/વેપાર કરાયેલું માલ?',
          commodity: 'માલ',
          newCommodity: 'માલ {{index}}',
          fillCommoditiesMessage:
            'કૃપા કરીને નીચેના પ્રશ્નોને તે માલ માટે પૂર્ણ કરો, જે તમે રૂમમાં વધુ લાવશો.',
          addCommodityButton: 'માલ ઉમેરો',
          genericFormError: 'કૃપા કરીને એક વિકલ્પ પસંદ કરો',
          experienceError: 'કૃપા કરીને એક કિંમત દાખલ કરો',
        },
        marketSurvey: {
          title: 'કૃપા કરીને {{crop}} ના ક્રેટ્સ માટે નીચેના પ્રશ્નોનો જવાબ આપો.',
          locationQuestion: 'તમે તમારા ઉત્પાદનને ક્યાં વેચ્યુ?',
          locations: {
            farm: 'ફાર્મ-ગેટ',
            market: 'સ્થાનિક બજાર',
            both: 'ફાર્મ-ગેટ અને બજાર',
          },
          priceQuestion: 'તમે કયું મૂલ્ય મેળવ્યું?',
          spoiledProducesQuestion:
            'ગત અઠવાડિયે સ્ટોર કરવામાં આવેલા ઉત્પાદનમાંથી કેટલુ ખરાબ થયું અથવા મધ્યમ બજાર ભાવ કરતાં ઓછા ભાવમાં વેચાયું?',
          spoilageReasonsQuestion: 'ફસલ ખરાબ થવાનું મુખ્ય કારણ શું છે?',
          formError: 'કૃપા કરીને એક વિકલ્પ પસંદ કરો',
        },
      },
      stringTemplates: {
        sendSMS: `{{companyName}} - {{movementType}} રસીદ:
        ચલન કોડ: {{code}}
        ફસલો: {{crops}}
        કુલ વજન: {{weight}} કિગ્રા
        {{movementTypeForDate}}: {{date}}
        કિંમંત: {{price}}
        ચૂકવ્યું: {{farmersName}}
        `,
        movementType: {
          checkOut: 'ચેક-આઉટ',
          checkIn: 'ચેક-ઇન',
          checkedOut: 'ચેક-આઉટ થઈ ગયું',
          checkedIn: 'ચેક-ઇન થઈ ગયું',
        },
      },
    },
    MyOrders: {
      sort: {
        mostRecent: 'સૌથી તાજેતરના',
        oldest: 'સૌથી જૂના',
        date: 'તારીખ',
      },
      title: 'ઓર્ડર સમીક્ષા',
      orderId: 'ઓર્ડર ID',
      cropType: 'પાક પ્રકાર',
      coolingUnit: 'કૂલિંગ યુનિટ',
      orderTotal: 'ઓર્ડર ટોટલ',
      backToTopButton: 'માટે પરત જાઓ',
    },
    ShoppingCart: {
      empty: 'તમારો કાર્ટ ખાલી છે',
      daysLeft: 'દિવસો બાકી',
      weight: 'KG ઉપલબ્ધ',
      perKg: '/ KG',
      totalToPay: 'મોડેવા માટેનો કુલ રકમ',
      pay: 'પેમેન્ટ કરો',
      orderHeader: 'ઓર્ડર',
      subtotal: 'ઉપકુલ',
      produce: 'ઉત્પાદન',
      discount: 'ડિસ્કાઉન્ટ',
      fees: 'સેવા ફી',
      marketFees: 'માર્કેટપ્લેસ ફી',
      paymentFee: 'પેમેન્ટ ફી',
      viewContacts: 'સંપર્ક જુઓ',
      contactsForDelivery: 'ડિલિવરી માહિતી માટેના સંપર્ક',
      gotItButton: 'સમજાયું!',
      pickupMethods: 'પિકઅપ પદ્ધતિ',
      pickUpToday: 'આજે પિકઅપ કરો',
      keepInStorageDailyRate: 'સંગ્રહમાં રાખો ({{price}} / દિવસ)',
      keepInStorageFixedRate: 'સંગ્રહમાં રાખો ({{price}})',
      delivery: 'ડિલિવરી',
      contactName: 'સંપર્કનું નામ',
      phoneNumber: 'ફોન નંબર',
      thankYouMessage: 'ઓર્ડર કરવા માટે આભાર',
      orderOverview: 'ઓર્ડર સમિક્ષા',
      products: 'ઉત્પાદનો',
      consultOrders: 'મારાં ઓર્ડરો તપાસો',
      total: 'કુલ',
      couponQuestion: 'શું તમારા પાસે ડિસ્કાઉન્ટ કૂપન છે?',
      redeem: 'કોડનો ઉપયોગ કરો.',
      redeemCoupon: 'કૂપનનો ઉપયોગ કરો',
      couponPlaceholder: 'ઉદાહરણ: 20OFF',
      discountsApplied: 'ડિસ્કાઉન્ટ લાગુ પાડવામાં આવ્યા',
      errors: {
        invalid: 'અમાન્ય મૂલ્ય',
        minimumCartValue: 'ઓર્ડર ઓછામાં ઓછા ₦100 હોવું જોઈએ.',
      },
    },
    Analytics: {
      emptyState: 'પ્રદર્શિત કરવા માટે કોઈ ડેટા નથી',
      company: 'કંપની',
      aggregated: 'સંકલિત',
      comparison: 'તુલના',
      downloadDataButton: 'ડેટા ડાઉનલોડ કરો',
      users: 'વપરાશકર્તા',
      impact: 'પ્રભાવ',
      maleLabel: '👨🏽 પુરુષ: {{amount}}',
      femaleLabel: '👩🏽 મહિલા: {{amount}}',
      otherLabel: 'અન્ય: {{amount}}',
      usersTotal: 'કુલ કૂલિંગ વપરાશકર્તાઓ = {{amount}}',
      operatorsTotal: 'કુલ ઓપરેટર્સ = {{amount}}',
      beneficiariesTotal: 'કુલ પરોક્ષ લાભાર્થીઓ = {{amount}}',
      totalCratesLabel: '🧺 કુલ ક્રેટ્સ',
      totalQuantityLabel: '📦 કુલ માત્રા (કિગ્રા)',
      totalOperations: '👷🏽‍♂️ કુલ ઓપરેશન્સ',
      checkedInLabel: 'ચેક-ઇન: {{amount}}',
      checkedOutLabel: 'ચેક-આઉટ: {{amount}}',
      methodologyButton: 'પદ્ધતિ જુઓ',
      farmersAnalytics: {
        coolingUserName: 'કૂલિંગ વપરાશકર્તા નામ',
        coolingUserType: 'કૂલિંગ વપરાશકર્તા પ્રકાર',
        avgStorageTime: 'સરેરા સ્ટોરેજ સમય',
        coldStorageCost: 'કૂલ સ્ટોરેજ ખર્ચ',
        days: 'દિવસ',
        baselineSurveyButton: 'બેસલાઇન સર્વે ભરો',
        baseLineSurveyMessage: 'તમે {{amount}} સર્વે પૂરા કરવા માટે છે 😟',
        postCheckOutSurveyButton: 'પોસ્ટ-ચેક-આઉટ સર્વે ભરો',
        postCheckOutSurveyMessage: 'તમે {{amount}} સર્વે પૂરા કરવા માટે છે 😟',
        noChangeFoodLoss: 'ખોરાક નષ્ટમાં કોઈ બદલાવ નથી',
        increaseInFoodLoss: 'ખોરાક નષ્ટમાં વધારો',
        decreaseInFoodLoss: 'ખોરાક નષ્ટમાં ઘટાડો',
        increaseInRevenue: 'આયમાં વધારો',
        decreaseInRevenue: 'આયમાં ઘટાડો',
        foodLossEvolution: '🥗 ફસલ પ્રમાણે ખોરાક નષ્ટના પરિવર્તન (ટોપ 5)',
        changePercentage: '% પરિવર્તન',
        crops: 'ફસલ',
        foodLossLevels: 'ખોરાક નષ્ટના સ્તરો',
        revenueEvolution: '💰 સરેરાશ આવકનો વિકાસ',
        revenueCropEvolution: '💰 ફસલ પ્રમાણે સરેરાશ આવકનો વિકાસ (ટોપ 5)',
        noChangeRevenue: 'આયમાં કોઈ બદલાવ નથી',
        revenueLevels: 'આવકના સ્તરો',
        baselineSurveyLabel: '📊 બેસલાઇન સર્વે પૂરા કરેલ',
        postCheckoutSurveyLabel: '📊 પોસ્ટ-ચેક-આઉટ સર્વે પૂરા કરેલ',
        allPostCheckoutSurveysCompleted: 'બધા પોસ્ટ-ચેક-આઉટ સર્વે પૂર્ણ થયા 🤝',
        allBaselineSurveysCompleted: 'બધા બેસલાઇન સર્વે પૂર્ણ થયા 🤝',
      },
      companyTab: {
        usersTab: {
          employeesTotal: 'કુલ નોંધાયેલા કર્મચારીઓ = {{amount}}',
          usersType: 'કૂલિંગ વપરાશકર્તા પ્રકાર',
          farmersLabel: '🧑🏽‍🌾 ખેડૂત: {{amount}}',
          tradersLabel: '👩🏽‍💼 વેપારી: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'કૂલિંગ યુનિટની સરેરાશ ભરાઈ:',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: '🥗 ખોરાક નષ્ટમાં ઉન્નતિ',
          revenueLabel: '💰 કૂલિંગ વપરાશકર્તા આવકમાં ઉન્નતિ',
          co2Label: '💨 CO2e ઉત્સર્જનની ઉન્નતિ',
          surveysAmountLabel: '📊 ખોરાક નષ્ટ અને આવક ઉન્નતિની ગણના માટે સર્વેની સંખ્યા',
          co2Increase: 'CO2e ઉત્સર્જન (કિગ્રા) કૂલિંગ સાથે વધ્યું',
          co2Decrease: 'CO2e ઉત્સર્જન (કિગ્રા) કૂલિંગ સાથે ઘટ્યું',
          co2WithoutCooling: 'કૂલિંગ વિના ઉત્સર્જન (કિગ્રા) પ્રતિ કિલો ઉત્પાદ',
          co2WithCooling: 'કૂલિંગ સાથે ઉત્સર્જન (કિગ્રા) પ્રતિ કિલો ઉત્પાદ',
          from: 'થી',
          to: 'ટું',
        },
        downloadFileName: 'analytics-data',
        utilization: 'ઉપયોગ',
        goBackButton: 'મુખ્ય પૃષ્ઠ પર પાછા જાઓ',
        companyNameLabel: 'કંપનીનું નામ',
        revenueLabel: 'કુલ આવક',
        coolingUnitsLabel: 'કૂલિંગ યુનિટ્સની સંખ્યા',
        singleCoolingUnitContent: '1 યુનિટ',
        coolingUnitsContent: '{{amount}} યુનિટ્સ',
        capacityLabel: 'કુલ કૂલિંગ ક્ષમતા',
        capacityContent: '{{amount}} મેટ્રિક ટન',
        coolingUnitTypeLabel: 'કૂલિંગ યુનિટ પ્રકાર',
        coolingUnitTypeMarket: '{{amount}} માર્કેટ રૂમ',
        coolingUnitTypeFarmGate: '{{amount}} ફાર્મ-ગેટ રૂમ',
        coolingUnitTypeMovable: '{{amount}} ચલનશીલ રૂમ',
      },
      tabsShared: {
        configurationMessage: 'કૃપા કરીને તમારી તારીખો અને કૂલિંગ યુનિટ્સને સેટ કરો',
        configureButton: 'સેટ કરો',
        crates: 'ક્રેટ્સ',
        dateRangeLabel: 'તારીખ શ્રેણી:',
        selectedUnitsLabel: 'ચૂંટેલા કૂલિંગ યુનિટ્સ:',
        totalCo2Label: '💨 કુલ CO2e ઉત્સર્જન:',
        roomRevenue: '📈 રૂમ આવક',
      },
      comparisonTab: {
        sortingLabel: 'સોર્ટિંગ',
        coolingUnit: 'કૂલિંગ યુનિટ',
        genderHeader: 'પુરુષ | મહિલા | અન્ય',
        genderSecondaryHeader: 'પુરુષ | મહિલા',
        total: 'કુલ',
        sortingMenuOptions: {
          descending: 'ઉતરતી ક્રમમાં',
          ascending: 'ઉત્ક્રમમાં',
          coolingUnitName: 'કૂલિંગ યુનિટ નામ',
        },
        usersTab: {
          operators: 'ઓપરેટર્સ',
          users: 'સક્રિય કૂલિંગ વપરાશકર્તા',
          activeUsers: 'સક્રિય વપરાશકર્તા',
          beneficiaries: 'લાભાર્થીઓ',
        },
        cratesTab: {
          crates: 'ક્રેટ્સ',
          kg: 'કિગ્રા',
          operations: 'ઑપરેશન્સ',
          checkedIn: 'ચેક કરવામાં આવ્યું',
          checkedOut: 'ચેકઆઉટ કરવામાં આવ્યું',
          checkedInCropDistribution: '🧺 ચેક-ઇન પાક વિતરણ (ક્રેટ્સ)',
          checkedInKgDistribution: '⚖️ ચેક-ઇન પાક વિતરણ (કિગ્રા)',
          checkInCropDistribution: 'ચેક-ઇન પાક વિતરણ',
          checkedOutCropDistribution: '🧺 ચેક-આઉટ પાક વિતરણ (ક્રેટ્સ)',
          checkedOutKgDistribution: '⚖️ ચેક-આઉટ પાક વિતરણ (કિગ્રા)',
          checkOutCropDistribution: 'ચેક-આઉટ પાક વિતરણ',
          co2: '💨 કૂળિંગ માટે ઉચ્છ્વાસિત CO2e',
          co2EmissionsLabel: 'CO2e ઉચ્છ્વાસ (કિગ્રા)',
          co2DistributionLabel: 'CO2e પાક વિતરણ',
          co2Kg: 'કિગ્રા CO2 ઉચ્છ્વાસ',
        },
        impactTab: {
          occupancyLabel: '🏘️ કૂલિંગ યુનિટની સરેરાશ ભરી',
          occupancy: 'ભરી',
          foodLossLabel: '🥗 ખોરાક નષ્ટમાં ઉન્નતિ',
          revenueLabel: '💰 કૂલિંગ વપરાશકર્તા આવકમાં ઉન્નતિ',
          changePercentage: '% પરિવર્તન',
          completePercentage: '% પૂર્ણ',
          foodLossLevels: 'ખોરાક નષ્ટના સ્તરો',
          revenueLevels: 'આવકના સ્તરો',
          revenuePerRoomLabel: '📈 પ્રતિ રૂમ આવક',
          co2Label: '💨 CO2e ઉત્સર્જનની ઉન્નતિ',
          surveysAmountLabel: '📊 ખોરાક નષ્ટ અને આવક ઉન્નતિની ગણના માટે સર્વેની સંખ્યા',
          co2EmissionsLabel: 'CO2e (કિગ્રા)',
        },
      },
    },
    Notifications: {
      text: {
        notifications: 'અધિસૂચનાઓ',
      },
      sensorError:
        'ઠંડા કમરા {{unitName}} માટેનો સેન્સર છેલ્લા 12 કલાકથી કોઇ ડેટા મોકલતા નથી. કૃપા કરીને આ ઠીક થાય ત્યાં સુધી માહિતી મેન્યુઅલી દાખલ કરો.',
      survey: '{{farmer}} માટે બજાર સર્વે પૂરું કરો, પ્રવાહ, {{movementCode}}.',
      link: 'કૃપા કરીને તેને પૂર્ણ કરવા માટે અહીં જાઓ.',
      coolingUserSurvey: 'તમે {{crop}} ચેક-ઇન કર્યું છે પરંતુ આ ફસલ માટે સર્વે પૂર્ણ કર્યું નથી.',
      operatorSurvey:
        'તમે {{farmer}} માટે {{crop}} ચેક-ઇન કર્યું છે પરંતુ આ ફસલ માટે સર્વે પૂર્ણ કર્યું નથી.',
      pickup:
        'તમારા {{crop}} ના ક્રેટ્સને યથાશિઘ્ર ઉઠાવવાની જરૂર છે! (ચેક-ઇન તારીખ: {{checkIn}}, ઠંડક યુનિટ આઈડી: {{unitId}}, ચેક-ઇન આઈડી: {{movementCode}}).',
      notifyCoolingUser:
        'કૃપા કરીને {{farmer}} નો સૂચન કરો કે તેમના {{crop}} ના ક્રેટ્સને યથાશિઘ્ર ઉઠાવવાની જરૂર છે! (ચેક-ઇન તારીખ: {{checkIn}}, ઠંડક યુનિટ આઈડી: {{unitId}}, ચેક-ઇન આઈડી: {{movementCode}}).',
      checkIn: 'ઓપરેટર {{farmer}} એ {{date}} ના રોજ {{movementCode}} ચેક-ઇન સંપાદિત કર્યું છે.',
      surveyAlreadyFilled: 'સર્વે પહેલેથી જ ભરાયું છે',
    },
  },
  tutorial: {
    welcome: 'કોલ્ડટિવેટમાં આપનું સ્વાગત છે. આ કાર્યની માર્ગદર્શિકા છે.',
    quit: 'ટ્યુટોરીયલ બંધ કરો',
    'back-dashboard': 'ડેશબોર્ડ પર પાછા જાઓ',
    congratulations:
      'અભિનંદન! તમે ટ્યુટોરીયલ પૂરું કર્યું છે! એપ્લિકેશનનો ઉપયોગ શરૂ કરવા માટે ડેશબોર્ડ પર પાછા જાઓ.',
    comic:
      'અભિનંદન! તમે કોમિક સ્ટ્રિપ પૂરી કરી છે! એપ્લિકેશનનો ઉપયોગ શરૂ કરવા માટે ડેશબોર્ડ પર પાછા જાઓ.',
    prev: 'પાછળ',
    next: 'આગળ',
    start: 'ટ્યુટોરીયલ શરૂ કરો',
    final:
      'અભિનંદન! તમે ટ્યુટોરીયલ પૂરું કર્યું છે! એપ્લિકેશનનો ઉપયોગ શરૂ કરવા માટે ડેશબોર્ડ પર પાછા જાઓ.',
    backToDashboard: 'ડેશબોર્ડ પર પાછા જાઓ',
    steps: {
      openDrawer:
        'ઉપર ડાબા ખૂણે, તમે મુખ્ય કાર્ય સાથેનું મેનૂ જોઈ શકો છો. આગળ જાઓ અને તે પર ક્લિક કરો.',
      repeatTutorial: 'જો તમે આ ટ્યુટોરીયલ ફરી જોવું ઇચ્છતા હો, તો તમે તેને મેનૂમાં પણ જોઈ શકો છો.',
      managementNavigation:
        'મેનૂમાં, તમે "ગવર્નન્સ" તરફ જાવી શકો છો અને ત્યાં ક્લિક કરીને કૂલિંગ વપરાશકર્તાઓને ઉમેરવા અથવા સંપાદિત કરવા માટે પહોંચો. આગળ જાઓ અને અજમાવો.',
      addCoolingUser:
        'જેઓ કોલ્ડટિવેટ પર નોંધાઈ નથી એવા કૂલિંગ વપરાશકર્તાઓને તેમના વિગત (નામ, ફોન નંબર) દાખલ કરીને ઉમેરવામાં આવી શકે છે. પહેલેથી જ એપ્લિકેશનમાં સાઇન અપ કરેલા કૂલિંગ વપરાશકર્તાઓને કોડ દ્વારા ઉમેરવામાં આવી શકે છે. તેઓ તેમના પ્રોફાઇલ પર કોડ મેળવી શકે છે -> "એકાઉન્ટ વિગતો" -> "કૂલિંગ વપરાશકર્તા આયાત કોડ".',
      navigateToCoolingUser: 'આગળ જાઓ અને કૂલિંગ વપરાશકર્તાઓ ટેબ પર ક્લિક કરો.',
      listCoolingUsers:
        'સ્માર્ટફોન ધરાવતા કૂલિંગ વપરાશકર્તાઓને સ્ક્રીનના જમણાં ભાગે ફોન આઈકન દ્વારા ઓળખવામાં આવે છે. અન્ય છેડતા ફોનવાળા કૂલિંગ વપરાશકર્તાઓ છે. બંનેમાં, તમે એક નામ પર ક્લિક કરીને તેમના વિગતો અને કૂલિંગ વપરાશકર્તા સર્વેની પહોંચ મેળવી શકો છો.',
      navigateToAddCoolingUser:
        "'+' ચિહ્ન પર ક્લિક કરવાથી તમે નવો કૂલિંગ વપરાશકર્તા ઉમેરવા માટે પરવાનગી મળે છે.",
      coolingUnitStep: 'તમે ઉપરના ડ્રોપડાઉન મેનુ પર ક્લિક કરીને કૂલિંગ યુનિટ્સમાં ખસવાઈ શકો છો.',
      initiateCheckIn1:
        'જ્યારે તમે કૂલિંગ વપરાશકર્તા ઉમેરો છો, ત્યારે તમે તે કૂલિંગ વપરાશકર્તા માટે ચેક-ઇન કરી શકો છો. આગળ જાઓ અને પ્રવૃત્તિ બટન પર ક્લિક કરો.',
      initiateCheckIn2: 'હવે ચેક-ઇન બટન પર ક્લિક કરો (યે લીલા છે).',
      checkIn1:
        'ચેક-ઇન પૂર્ણ કરવા માટે, તમને "કેટલો ઉમેરો" પર ક્લિક કરવાની જરૂર છે અને પગલાંને પગલાં અનુસરો. પરિણામ શું દેખાય છે તે જોવા માટે \'ઝરૂરી\' પર ક્લિક કરો.',
      checkIn2:
        'બધા પગલાં પૂર્ણ થયા પછી, તમને એક ઝલક મળશે જે તમે રૂમમાં ચેક કરવા માટે જઈ રહ્યા છો.',
      checkIn3:
        'જો તમે સંતોષ્યા હોય, તો તમે "પુષ્ટી" પર ક્લિક કરી શકો છો અને નવા કેટલાઓ ડેશબોર્ડમાં ઉમેરવામાં આવશે.',
      history: '"ઇતિહાસ" પર ક્લિક કરીને, તમે રૂમમાં તમામ ચળવળો જોઈ શકો છો.',
      coolingUnits:
        '"કૂલિંગ યુનિટ્સ" પર ક્લિક કરીને આગામી 7 દિવસોમાં એક કૂલિંગ યુનિટની ક્ષમતાને (પ્લેનર ટેબ) અને રૂમનો તાપમાન (રૂમની શરતોના ટેબ) જોવાનું છે.',
      roomConditions:
        'જો તમારી પાસે એપ્લિકેશન સાથે સંકળાયેલ સેન્સર ન હોય, તો તમે "રૂમની શરતો"માં કૂલિંગ રૂમનો તાપમાન મેન્યુઅલી અપડેટ કરી શકો છો.',
      checkOut1:
        'ચેક-આઉટ શરૂ કરવા માટે, પ્રવૃતિ બટન પર ક્લિક કરો અને પછી લાલ બટન પર ક્લિક કરો. પછી ચેક-આઉટ પૂર્ણ કરવા માટે સૂચનાઓને અનુસરો.',
      checkOut2: 'તમે ચેક-આઉટ કરવા માંગતા કૂલિંગ યુનિટ અને પાકોને પસંદ કરી શકો છો.',
      checkOut3:
        'એકવાર વસ્તુઓને ચૂકવવામાં આવ્યા પછી, અનુરૂપ બટન પર ક્લિક કરો અને ચેક-આઉટને અંતિમ રૂપ આપો.',
      navigateToLocations:
        'સૌથી પહેલા તમારે એક સ્થળ ઉમેરવું પડશે. આગળ જાઓ અને લોકેશન ટેબ પર ક્લિક કરો.',
      locations:
        'તમે નામ પસંદ કરીને અને તેની અક્ષાંશ અને રેખાંશ ઉમેરવા, તમારા GPS કોર્ડિનેટ્સ શેર કરીને (જો તમે કૂલ રૂમના સ્થળે છો), અથવા સરનામું લખીને એક સ્થળ ઉમેરવા શકો છો.',
      navigateToCoolingUnits:
        'એક સ્થળ ઉમેર્યા પછી, તમે એક કૂલિંગ યુનિટ ઉમેરવા માટે આગળ જાવી શકો છો. આગળ જાઓ અને કૂલિંગ યુનિટ્સ ટેબ પર ક્લિક કરો.',
      addCoolingUnits:
        'કૂલિંગ યુનિટને ઉપર જણાવેલ વિગતો પૂર્ણ કરીને ઉમેરવામાં આવે છે. જો તમને કૂલિંગ યુનિટમાં તાપમાન સેન્સર અને એક API ઉપલબ્ધ છે, તો તમે ક્રેડેંશિયલ્સ દાખલ કરી શકો છો અને આપમેળે તમારી સેન્સરોને એપ્લિકેશન સાથે કનેક્ટ કરી શકો છો.',
      addEmployeesOperators:
        'તમે મેનેજમેન્ટ સ્ક્રીન દ્વારા નોંધણી કરેલ કર્મચારીઓ અને ઓપરેટર્સને ઉમેરવા માટે તેમનો ફોન નંબર જરૂર છે. તેમને આમંત્રણ લિંક સાથે SMS મળશે. એક ફોન નંબર ફક્ત એક જ વપરાશકર્તા માટે ઉપયોગમાં લેવામાં આવી શકે છે.',
      employeeCoolingUnitsStep:
        'જ્યારે તમે એક કૂલિંગ યુનિટ પસંદ કરો છો, ત્યારે તમે "ડેશબોર્ડ" ટેબમાં ચેક ઇન્સ, "ઇતિહાસ" ટેબમાં ચળવળો, અને "કૂલિંગ યુનિટ" ટેબમાં આયોજન કરવામાં આવેલ ઉપયોગ દર અને રૂમનો તાપમાનને ઝલક જોઈ શકો છો.',
      localizationPreferences:
        'તમે "સ્થાનિકરણ મરામત" પસંદ કરીને એપ્લિકેશનની ભાષા બદલી શકો છો. ભાષા બદલવા માટે "ફેરફાર સાચવો" બટન પર ક્લિક કરવાનું ભૂલશો નહીં!',
      accountDetailsNavigation:
        'મેનૂમાં, તમે "એકાઉન્ટ વિગતો" તરફ જાવી શકો છો અને ત્યાં ટેપ કરીને તમારા એકાઉન્ટ સંબંધિત રૂપરેખાઓને જુઓ/સંપાદિત કરી શકો છો. આગળ જાઓ અને અજમાવો.',
      coolingUserSurvey:
        'એપ્લિકેશન તમને કસ્ટમાઇઝ્ડ ભલામણો આપવા માટે કૂલિંગ વપરાશકર્તા સર્વે પૂરી કરવી ખુબજ મહત્વપૂર્ણ છે. સર્વે પૂર્ણ કરવા માટે તમારું આભાર!',
      coolingUserCode:
        'જ્યારે તમે પહેલી વખત તમારું ઉત્પાદ ને ઠંડા રૂમમાં સ્ટોર કરવા જઈ રહ્યા છો, ત્યારે ઓપરેટર તમારો વ્યક્તિગત કોડ માંગશે, જેથી તે તમને ઠંડા રૂમના વપરાશકર્તાઓની યાદીમાં ઉમેરવામાં આવશે. તમે આ કોડ "વ્યક્તિગત વિગતો" -> "કૂલિંગ વપરાશકર્તા આયાત કોડ" માં જોઈ શકો છો.',
      knowledgeHub:
        'મેનૂમાં, તમે "જ્ઞાન કેન્દ્ર" શોધી શકો છો, જેમાં વિવિધ પાકોને કેટલાંક સમય માટે સ્ટોર કરી શકાય છે અને તેમનો શ્રેષ્ઠ તાપમાન શું છે તેની સલાહ છે. ભલામણ કરવામાં આવે છે કે કેવી રીતે ઠંડા રૂમ તમારા ફળો અને શાકભાજીના ગુણવત્તાને જાળવવામાં મદદ કરી શકે છે!',
      faq: 'મેનૂમાં, તમે સામાન્ય પ્રશ્નો (FAQ) પણ શોધી શકો છો. અમે ભલામણ કરીએ છીએ કે તમે તેમને તપાસો, જેથી તમે એપ્લિકેશન વિશે વધુ જાણો અને તમારા ઉત્પાદોને ઠંડા રૂમમાં સ્ટોર કરવાની ફાયદા વિશે જાણો.',
      dashboardStep1:
        'જ્યારે ઓપરેટરે તમારું ચેક ઇન પૂર્ણ કર્યું છે, ત્યારે તમે "ડેશબોર્ડ" વિભાગમાં રૂમમાં સંગ્રહિત ઉત્પાદને જોઈ શકશો. દરેક કાર્ડમાં સમાન પ્રકારના પાકોની એક્સેટ્ટો સેટ છે જે એક સાથે ચેક ઇન કરવામાં આવ્યા છે.',
      dashboardStep2:
        'ડેશબોર્ડમાં દરેક કાર્ડમાં પાકના પ્રકાર, જથ્થામાં રાખવામાં આવેલા ક્રેટ્સની સંખ્યા, તેઓ કેટલા દિવસોથી સંગ્રહિત છે, બધા ક્રેટ્સ માટેનો કુલ દૈનિક ભાવ, અને ચેક-ઇન આઈડીની માહિતી આપવામાં આવે છે.',
      dashboardStep3:
        'રંગીન દિવસોની સંખ્યા "પિક અપનો સમય" (TTPU) દર્શાવે છે, જે દર્શાવે છે કે તમારા ઉત્પાદનો રેફ્રિજરેટેડ રહેવા માટે કેટલા દિવસો સુધી સારી સ્થિતિમાં રહેશે. લાલ રંગ સૂચવે છે કે ઉત્પાદન ગુણવત્તા ગુમાવતું છે અને તેને શક્ય તેટલી વહેલીથી ઉઠાવી લેવું જોઈએ.',
      dashboardStep4:
        'જો કાર્ડનો રંગ પીળો (2-5 દિવસ બાકી) અથવા લીલો (5 દિવસથી વધુ) હોય, તો તમને ક્રેટ્સ વિશે ચિંતા કરવાની જરૂર નથી. દિવસોની સંખ્યા દરરોજ ઘણીવાર પુનઃગણના કરવામાં આવે છે, તેથી કૃપા કરીને ડેશબોર્ડને નિયમિત રીતે તપાસતા રહો જેથી તમારા ક્રેટ્સની ગુણવત્તા કેવી રીતે બદલાઈ રહી છે તે જાણી શકો.',
      dashboardStep5:
        'જો તમારી પાસે અનેક રૂમમાં જથ્થા ભરેલા ક્રેટ્સ હોય, તો તમે ડ્રોપડાઉન મેનૂમાંથી કંપની અને કૂલિંગ યુનિટ પસંદ કરીને રૂમના દર્શન બદલી શકો છો.',
      farmerHistory:
        '“ઈતિહાસ” ટેબમાં, તમે દરેક રૂમમાં પૂર્ણ કરેલા બધા ચેક-ઇન અને ચેક-આઉટનો સારાંશ જોઈ શકો છો. જો તમે ચેકઆઉટની બાજુમાં લાલ બિંદુ જુઓ, તો ત્રણ બિંદુઓ પર ક્લિક કરો અને “માર્કેટ સર્વે ભરો” પસંદ કરો. આ અમને સમજીવાને મદદ કરે છે કે તમે તમારા ઉત્પાદનને કયા ભાવમાં વેચ્યું અને કોઈ વસ્તુઓ નષ્ટ થઈ છે કે નહીં, જે ઠંડા ખંડના સંચાલનમાં સુધારો કરવા માટે ખૂબ જ મહત્વપૂર્ણ છે.',
      farmersCoolingUnits:
        'તમારા નજીકની કૂલિંગ યુનિટ શોધવા માટે, તળિયાના બટનો પર જાઓ, “કૂલિંગ યુનિટ” ટેબ પર ક્લિક કરો અને “નકશા” પસંદ કરો. નકશામાં દરેક પિન પર ક્લિક કરીને, તમે એકમનો પ્રકાર અને સંગ્રહનો ભાવ જોઈ શકો છો.',
      farmersUnitsPlanner:
        '“કૂલિંગ યુનિટ્સ” ટેબમાં, તમે નકશા, રૂમની વર્તમાન અને ભવિષ્યની ઓક્યુપન્સી ( “પ્લેનર” હેઠળ) અને રૂમનું તાપમાન (“રૂમ કન્ડિશન્સ”માં) શોધી શકો છો. આ સ્ક્રીનો તમને નિહાળવામાંની જરૂર વિના ઠંડા ખંડની શરતો પર દૂરથી દેખાવા માટેની મંજૂરી આપે છે!',
      marketPrice:
        'જો “માર્કેટ ભાવ” ટેબ હોય, તો તમે દેશભરમાં વિવિધ ફળો અને શાકભાજીના તાજેતરના ભાવોની તપાસ કરી શકો છો, અને ભવિષ્યના ભાવની પૂર્વાનુમાન પણ જોઈ શકો છો. હાલમાં, આ સુવિધા માત્ર કેટલાક દેશો માટે ઉપલબ્ધ છે.',
      farmerFinalStep:
        'અભિનંદન! તમે ટ્યુટોરિયલ પૂર્ણ કર્યું છે! એપ્લિકેશન વિશે કોઈ પ્રશ્નો માટે, કૃપા કરીને FAQ તપાસો, ઠંડા ખંડના ઓપરેટરને પૂછો, અથવા અમને app@yourvcca.org પર ઇમેઇલ કરો.',
    },
  },
} satisfies Translations;
