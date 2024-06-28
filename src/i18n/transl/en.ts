const en = {
  languages: {
    current: 'English',
    label: 'Language',
    options: {
      en: 'English',
      hi: 'Hindi',
      or: 'Oriya',
      gu: 'Gujarati',
      fr: 'French',
      pt: 'Portuguese',
    },
  },
  actions: {
    error: 'An error occured',
    cancel: 'Cancel',
    confirm: 'Confirm',
    import: 'Import',
    yes: 'Yes',
    no: 'No',
    select: 'Select',
    close: 'Close',
    delete: 'Delete',
    ok: 'Ok',
    all: 'All',
    none: 'None',
    next: 'Next',
    back: 'Back',
    search: 'Search...',
    or: 'or',
    'not-available': 'N/A',
    'complete-later': 'Complete later',
    'update-success': 'Succesfully updated',
  },
  Auth: {
    Root: {
      welcome: 'Welcome to Coldtivate',
      signIn: 'Sign In',
      signUpCompany: 'Sign up as Company',
      signUpCoolingUser: 'Sign up as Cooling User',
      appInfo: 'App Info',
    },
    SignIn: {
      heading: 'Sign In',
      accounts: {
        registeredEmployee: {
          label: 'Registered Employee',
          description:
            'Part of the cold room provider management team. A registered employee can register the company in the app and invite other employees to join. Registered employees can log in with email or phone number.',
        },
        operator: {
          label: 'Operator',
          description:
            'Employee physically present at the cold room and managing its check-in, check-out operations. Operators can be invited by registered employees to join the company. Operators can log in with a phone number.',
        },
        coolingUser: {
          label: 'Cooling User',
          description:
            'The cold room user. Farmers, traders, retailers who have access to a smartphone can log in here. Cold room users without a smartphone can access the information of the app by visiting a cold room and interacting with the operator.',
        },
      },
      form: {
        user: {
          placeholder: 'Email/Phone Number',
          description: {
            default: 'Please provide valid phone number (with country code).',
            registeredEmployee: 'Please provide valid email/phone number (with country code).',
          },
          messages: {
            default: 'Phone number is required.',
            registeredEmployee: 'An email address or a phone number is required.',
          },
        },
        password: {
          placeholder: 'Password',
          messages: {
            required: 'Password is required',
          },
        },
        actions: {
          logIn: 'Log in',
        },
      },
    },
    ForgotPassword: {
      heading: 'Forgot Password',
    },
  },
  Dashboard: {
    CoolingUnitsPlanner: {
      SelectCoolingUnit: {
        label: 'Cooling unit: {{name}}',
        header: 'Select a cooling unit',
      },
      occupancy: 'Current occupancy of the cooling unit',
      week: 'This week',
    },
  },
};

export default en;
export type Translations = typeof en;
