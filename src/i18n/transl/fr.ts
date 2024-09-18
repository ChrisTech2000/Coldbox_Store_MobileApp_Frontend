import type { Translations } from './en';

export default {
  languages: {
    current: 'Anglais',
    label: 'Langue',
    options: {
      en: 'Anglais',
      hi: 'Hindi',
      or: 'Oriya',
      gu: 'Gujarati',
      fr: 'Français',
      pt: 'Portugais',
    },
  },
  gender: {
    female: 'Femme',
    male: 'Homme',
    other: 'Autre',
  },
  navigation: {
    auth: {
      SignIn: 'Connexion',
      SignUp: 'Inscription',
      ForgotPassword: 'Mot de passe oublié',
      PasswordReset: 'Réinitialiser',
      AppInfo: "Infos sur l'application",
      Logout: 'Déconnexion',
    },
    management: {
      Root: 'Gestion',
      CompanyDetails: "Détails de l'entreprise",
      RevenueAnalysis: 'Analyse des revenus',
      UsageAnalysis: "Analyse de l'utilisation",
      Locations: 'Emplacements',
      AddLocation: 'Ajouter un emplacement',
      EditLocation: "Modifier l'emplacement",
      CoolingUnits: 'Unités de refroidissement',
      DisabledCoolingUnitsDescription: 'Ajoutez au moins un emplacement',
      CoolingUsers: 'Utilisateurs de refroidissement',
      AddCoolingUser: 'Ajouter un utilisateur de refroidissement',
      EditCoolingUser: "Modifier l'utilisateur de refroidissement",
      AddCoolingUnit: 'Ajouter une unité de refroidissement',
      EditCoolingUnit: "Modifier l'unité de refroidissement",
      Operators: 'Opérateurs',
      AddOperator: 'Ajouter un opérateur',
      EditOperator: "Modifier l'opérateur",
      RegisteredEmployee: 'Employé enregistré',
      AddRegisteredEmployee: 'Ajouter un employé enregistré',
      RegisteredEmployeeDetails: "Détails de l'employé enregistré",
    },
    bottomTabs: {
      RootMainTabStack: "{{firstName}}'s Coldtivate",
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'Marketplace settings', // TODO
      PriceTrend: 'Tendance des prix',
      PriceRanking: 'Classement des prix',
      Planner: 'Planificateur',
      RoomConditions: 'Conditions de la pièce',
      CratesInfo: 'Informations sur les caisses',
      Dashboard: 'Tableau de bord',
      History: 'Historique',
      MarketPrice: 'Prix du marché',
      CoolingUnits: 'Unités de refroidissement',
      Analytics: 'Analytique',
      CheckIn: 'Enregistrement',
      CheckOut: 'Retirer',
      Maps: 'Cartes',
    },
    dashboard: {
      AccountDetails: 'Détails du compte',
      PersonalDetails: 'Personal details', // TODO
      LocalizationPreferences: 'Localization preferences', // TODO
      ContactsSharing: 'Contacts sharing', // TODO
      Coupons: 'Coupons', // TODO
      CouponsActiveTab: 'Active', // TODO
      CouponsRevokedTab: 'Revoked', // TODO
      KnowledgeHub: 'Centre de connaissances',
      QuitTutorial: 'Quitter le tutoriel',
      FAQ: 'FAQ',
      About: 'À propos',
      Management: 'Gestion',
      Tutorial: 'Tutoriel',
      PayoutOptions: 'Options de paiement',
      PaymentMethods: 'Méthodes de paiement',
      Wallet: 'Portefeuille',
      Transactions: 'Transactions',
      AddCard: 'Ajouter une carte de crédit',
      EditCard: 'Modifier une carte de crédit',
      Transaction: '{{id}}',
    },
    checkIn: {
      SelectCropType: 'Sélectionner le type de culture',
      CheckIn: 'Enregistrement',
      CropList: '{{cropType}}',
      CrateSetup: 'Enregistrement',
      CrateWeightAndPricing: 'Crate weight and pricing', // TODO
    },
    about: {
      comsolAgreement: 'Contrat de Licence Runtime COMSOL 6.0',
      userLicense: 'CONTRAT DE LICENCE UTILISATEUR FINAL',
      aboutComsol: 'À propos de COMSOL',
      privacyPolicy: 'Politique de confidentialité',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: 'Enquête de marché pour {{farmer}}',
      BaseSurvey: 'Enquête sur les utilisateurs de refroidissement',
    },
    analytics: {
      methodology: 'Méthodologie',
    },
  },
  actions: {
    error: 'Une erreur est survenue',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    import: 'Importer',
    yes: 'Oui',
    no: 'Non',
    select: 'Sélectionner',
    close: 'Fermer',
    delete: 'Supprimer',
    ok: "D'accord",
    all: 'Tout',
    none: 'Aucun',
    next: 'Suivant',
    back: 'Retour',
    search: 'Rechercher...',
    or: 'ou',
    add: 'Ajouter',
    edit: 'Éditer',
    go: 'Aller!',
    done: 'Terminé',
    'not-available': 'Non disponible',
    'complete-later': 'Compléter plus tard',
    'update-success': 'Mis à jour avec succès',
    'save-changes': 'Enregistrer les modifications',
    continue: 'Continuer',
    save: 'Enregistrer',
  },
  components: {
    datePicker: {
      clearButtonLabel: 'Effacer',
      confirmButtonLabel: 'Confirmer',
      placeholder: 'jj/mm/aaaa',
      startDateSelection: 'Sélectionner la date de début:',
      endDateSelection: 'Sélectionner la date de fin:',
    },
  },
  Auth: {
    Root: {
      welcome: 'Bienvenue sur Coldtivate',
      signIn: 'Se connecter',
      signUpCompany: "S'inscrire comme entreprise",
      signUpCoolingUser: "S'inscrire comme utilisateur de refroidissement",
      appInfo: "Informations sur l'application",
    },
    SignIn: {
      heading: 'Connexion',
      accounts: {
        registeredEmployee: {
          label: 'Employé enregistré',
          description:
            "Membre de l'équipe de gestion du fournisseur de chambre froide. Un employé enregistré peut enregistrer l'entreprise dans l'application et inviter d'autres employés à rejoindre. Les employés enregistrés peuvent se connecter avec un e-mail ou un numéro de téléphone.",
        },
        operator: {
          label: 'Opérateur',
          description:
            "Employé présent physiquement dans la chambre froide et gérant ses opérations de check-in et check-out. Les opérateurs peuvent être invités par des employés enregistrés à rejoindre l'entreprise. Les opérateurs peuvent se connecter avec un numéro de téléphone.",
        },
        coolingUser: {
          label: 'Utilisateur de refroidissement',
          description:
            "L'utilisateur de la chambre froide. Les agriculteurs, commerçants, détaillants ayant accès à un smartphone peuvent se connecter ici. Les utilisateurs de chambres froides sans smartphone peuvent accéder aux informations de l'application en visitant une chambre froide et en interagissant avec l'opérateur.",
        },
        toasts: {
          login:
            "Le nom d'utilisateur ou le mot de passe est incorrect. Veuillez confirmer que vous avez sélectionné le bon rôle d'utilisateur",
          success: 'Connexion réussie',
        },
      },
      form: {
        user: {
          placeholder: 'E-mail/Numéro de téléphone',
          description: {
            default: "Veuillez fournir un numéro de téléphone valide (avec l'indicatif du pays).",
            registeredEmployee:
              "Veuillez fournir un e-mail/numéro de téléphone valide (avec l'indicatif du pays).",
          },
          messages: {
            default: 'Le numéro de téléphone est requis.',
            registeredEmployee: 'Une adresse e-mail ou un numéro de téléphone est requis.',
          },
        },
        password: {
          placeholder: 'Mot de passe',
          messages: {
            required: 'Le mot de passe est requis',
          },
        },
        actions: {
          logIn: 'Se connecter',
        },
      },
    },
    SignUp: {
      select: {
        header: 'Sélectionnez un {{fieldName}}',
        label: 'Rechercher...',
        cancel: 'Annuler',
        ok: 'OK',
      },
      welcome: 'Bienvenue sur Coldtivate',
      schema: {
        passwordError:
          'Votre mot de passe doit comporter au moins 8 caractères, contenir une lettre majuscule, une lettre minuscule et un chiffre.',
        confirmPasswordError: 'La confirmation du mot de passe est obligatoire.',
        passwordsMismatchError: 'Les mots de passe ne correspondent pas.',
        countryError: 'La sélection du pays est obligatoire.',
        firstNameError: 'Le prénom est obligatoire.',
        lastNameError: 'Le nom est obligatoire.',
        phoneError: 'Le numéro de téléphone est obligatoire.',
        invalidPhoneError: 'Le numéro de téléphone est invalide',
        languageError: 'La langue est obligatoire.',
        genderError: 'La sélection du genre est obligatoire.',
        termsError: "Vous devez accepter les Conditions d'utilisation.",
        companyError: "Le nom de l'entreprise est obligatoire.",
        currencyError: 'La sélection de la devise est obligatoire.',
        emailError: "L'email est obligatoire.",
        malformedEmailError: 'Email invalide.',
      },
      commonForm: {
        firstNameLabel: 'Prénom',
        lastNameLabel: 'Nom',
        phoneLabel: "Numéro de téléphone (avec l'indicatif du pays)",
        passwordLabel: 'Mot de passe',
        confirmPasswordLabel: 'Confirmer le mot de passe',
        countryFieldName: 'pays',
        genderFieldName: 'genre',
        terms:
          "J'accepte l'Accord de licence utilisateur Coldtivate, la Politique de confidentialité et les Conditions d'utilisation COMSOL",
        submit: "S'inscrire",
      },
      SignUpCompany: {
        companyHeader: "S'inscrire comme entreprise",
        userHeader: "S'inscrire comme employé enregistré",
        companyNameLabel: "Nom de l'entreprise",
        emailLabel: 'Email',
        currencyFieldName: 'devise',
        modal: {
          warning:
            'Si vous vous inscrivez sans téléphone, certaines fonctionnalités ne fonctionneront pas :',
          reasons: {
            1: 'Réinitialisation du compte',
            2: 'Réception des reçus par SMS',
          },
          buttons: {
            continue: 'Continuer quand même',
            addPhone: 'Ajouter un téléphone',
          },
        },
      },
      SignUpCoolingUser: {
        header: "S'inscrire comme utilisateur de refroidissement",
        languageFieldName: 'langue',
      },
    },
    ForgotPassword: {
      heading: 'Mot de passe oublié',
      messageSentNotification:
        'Si le numéro de téléphone existe, un SMS a été envoyé pour réinitialiser votre mot de passe.',
      instructions:
        'Pour réinitialiser votre mot de passe, veuillez entrer le numéro de téléphone avec son indicatif du pays, auquel le compte est connecté.',
      phoneInputLabel: 'Numéro de téléphone',
      resetButton: 'Réinitialiser',
      link: {
        partOne: 'Cliquez sur ce lien pour réinitialiser votre mot de passe {{baseLink}}',
      },
    },
    ResetPassword: {
      schema: {
        passwordError:
          'Votre mot de passe doit comporter au moins 8 caractères, contenir une lettre majuscule, une lettre minuscule et un chiffre.',
        confirmPasswordError: 'La confirmation du mot de passe est obligatoire.',
        passwordsMismatchError: 'Les mots de passe ne correspondent pas.',
      },
      passwordLabel: 'Nouveau mot de passe',
      confirmPasswordLabel: 'Confirmer le mot de passe',
      resetButton: 'Réinitialiser',
    },
    Invite: {
      heading: 'Bienvenue sur Coldtivate',
      employee:
        "Vous avez été invité en tant qu'employé. Veuillez remplir le formulaire pour terminer votre inscription.",
      operator:
        "Vous avez été invité en tant qu'opérateur. Veuillez remplir le formulaire pour terminer votre inscription.",
      fields: {
        password:
          'Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre.',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'Alerte de température',
      subtitle:
        "Nous avons remarqué qu'il y avait un changement. Voici les produits actuellement en stockage.",
      edit: 'Voulez-vous modifier la température?',
      temperature: 'Température',
      newTemperature: 'Nouvelle température',
      confirm: 'Confirmer la nouvelle température',
      continueWithoutUpdate: 'Continuer sans mise à jour',
      sensorHint:
        "Impossible d'ajouter la température car un capteur est connecté à l'unité de refroidissement.",
      latestTemperature: 'La dernière température a été enregistrée le {{date}}.',
    },
    emptyGeneral: "Pour l'instant, aucune donnée disponible.",
    emptyCoolingUser:
      'Les articles en stockage apparaîtront dans le tableau de bord lorsque vous effectuerez au moins un enregistrement dans une pièce.',
    noCompanyAvailable: 'Aucune entreprise disponible',
    noCoolingUnitAvailable: 'Aucune unité de refroidissement disponible',
    noLocationsAvailable:
      'Bienvenue sur Coldtivate. Commencez en ajoutant des lieux à votre application dans le panneau de gestion.',
    MarketPrice: {
      emptyState: 'Les prix du marché ne sont pas disponibles dans votre pays',
      commodityLabel: 'Marchandise',
      commodityModalTitle: 'Sélectionnez une marchandise',
      Trend: {
        title: 'Sélectionnez une marchandise et un état pour obtenir une prévision des prix',
        emptyState: 'Aucune donnée trouvée pour cette combinaison de marché et de marchandise',
        pastLabel: 'Passé',
        stateLabel: 'État',
        stateModalTitle: 'Sélectionnez un état',
        forecastLabel: 'Prévision',
        chartLabel: 'Prix en {{currency}}/Kg',
      },
      Ranking: {
        filter: 'Filtrer par lieu',
        monthLabel: 'Mois',
        monthModalTitle: 'Sélectionnez les mois',
        stateModalTitle: 'Sélectionnez les états',
        stateLabel: 'États',
        table: {
          column1: 'État',
          column2: 'Date',
          column3: 'Prix en {{currency}}/Kg',
          emptyState: 'Aucune valeur disponible',
        },
      },
    },
    CrateManagement: {
      userModalTitle: 'Sélectionnez un utilisateur de refroidissement',
      addUserLink:
        "Utilisateur de refroidissement non dans la liste? Ajoutez l'utilisateur depuis Gestion ➜ Utilisateurs de refroidissement ➜ +",
      coolingUserLabel: 'Utilisateur de refroidissement',
      selectCoolingUnitLabel: 'Sélectionnez une unité de refroidissement',
      coolingUnitLabel: 'Unité de refroidissement',
      noUnitWarning: 'Veuillez sélectionner une unité de refroidissement',
      noCratesWarning:
        "L'utilisateur de refroidissement sélectionné n'a aucun crate dans cette unité de refroidissement",
      operationError: 'Une erreur est survenue. Veuillez réessayer plus tard.',
      FarmerSurvey: {
        warningMessage: "Veuillez remplir l'enquête de base pour {{crop}} !",
        modal: {
          weeklyQuantityQuestion:
            'Quelle est la quantité de {{crop}} que vous produisez ou commercialisez par semaine?',
          cropSpoilageQuestion: 'Quelle est la principale raison du gaspillage des cultures?',
          marketPriceQuestion: 'Prix moyen du marché par semaine lors de la vente de {{crop}}',
          quantityDistributionQuestion: 'Combien de cela est :',
          selfConsumed: 'Auto-consommé ({{unit}})',
          sold: 'Vendu ({{unit}})',
          lost: 'Perdu ou vendu en dessous du prix du marché ({{unit}})',
          totalQuantity: 'Quantité totale produite par semaine',
          unitWeight: 'Chaque {{crate}} est',
          selectSpoilageReasonsPlaceholder: 'Sélectionnez toutes les raisons applicables',
          priceLabel: 'Prix',
          priceUnit: 'par {{unit}}',
          commodityShortlist: 'Liste des produits',
          unit: {
            kg: 'Kg',
            crates: 'Caisses',
            boxes: 'Boîtes',
            sacks: 'Sacs',
            baskets: 'Paniers',
            singular: {
              kg: 'kg',
              crates: 'caisse',
              boxes: 'boîte',
              sacks: 'sac',
              baskets: 'panier',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'Récolte ou manipulation inappropriée',
            inappropriateStorage: 'Stockage inapproprié / manque de stockage ancien',
            overproduction: 'Surproduction',
            transportationDamage: 'Dommages lors du transport',
            pest: 'Insectes',
            diseases: 'Maladies',
            weather: 'Conditions météorologiques extrêmes',
            price: 'Prix du marché trop bas',
            other: 'Autre',
          },
          errorMessages: {
            number: 'Doit être un nombre positif non nul',
            reasonsForSpoilage: 'Veuillez indiquer au moins une raison.',
            totalMismatch:
              'La somme des Auto-consommé, Vendu et Perdu ou vendu en dessous du prix du marché doit être égale à la quantité totale produite.',
            cropError: 'Veuillez sélectionner une marchandise',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'Sélectionnez les caisses que vous souhaitez retirer',
        selectAll: 'Tout sélectionner',
        checkIn: 'Enregistrement',
        days: 'jours',
        day: 'jour',
        ttp: 'TTP',
        numberOfCrates: 'Nombre de caisses',
        totalWeight: 'Poids total',
        priceType: 'Type de prix',
        crate: 'caisse',
        pricePerProduct: 'Prix par produit :',
        calculatedPrice: 'Prix calculé',
        discount: 'Remise',
        priceWithDiscount: 'Prix total',
        paymentType: {
          label: 'Type de paiement',
          cash: 'Espèces',
          creditCard: 'Carte de crédit',
        },
        paid: 'Payé',
      },
      CheckIn: {
        emptyState: 'Aucune boîte ajoutée pour le moment',
        addCrates: 'Ajouter des caisses',
        checkInWithCode: 'Enregistrement avec code',
        estimatedCost: 'Coût estimé',
        pricing: 'Tarification',
        day: 'jour',
        successMessage: 'Les caisses ont été enregistrées avec succès',
        emptyMessage: 'Veuillez ajouter au moins une caisse à votre enregistrement',
        noPlannedDaysMessage:
          'Des jours planifiés manquent pour certains articles. Impossible de calculer le coût estimé.',
        WithCode: {
          modalTitle: "Créer un enregistrement à partir d'un retrait existant",
          modalDescription:
            "Vous aurez besoin du code de retrait pour commencer un nouvel enregistrement de cette manière. Si vous ne l'avez pas, envisagez de commencer un nouvel enregistrement. Si vous savez combien de temps vous prévoyez de stocker, envisagez d'ajouter le nombre de jours ici.",
          codeLabel: 'Ajouter le code',
          codeErrorMessage: 'Le code est requis',
        },
        SelectCropType: {
          fruits: 'Fruits',
          vegetables: 'Légumes',
          rootVegetables: 'Légumes-racines',
          other: 'Autres articles',
        },
        SelectCrop: {
          additionalInfo: 'Informations supplémentaires',
        },
        Setup: {
          selectedCrop: 'Culture sélectionnée',
          changeCropButton: 'Cliquez ici pour changer la culture',
          individualCrateWeightButton: 'Cliquez ici pour modifier le poids des caisses',
          individualCrateIdButton: 'Cliquez ici pour modifier les ID des caisses',
          numberOfCratesLabel: 'Nombre de caisses',
          crateWeightLabel: 'Poids général de la caisse',
          pricePerDayAndCrateLabel: 'Prix par jour / caisse',
          pricePerDayAndKilogramLabel: 'Prix par jour / kg',
          fixedPriceLabel: 'Prix fixe',
          totalPriceLabel: 'Prix total',
          plannedDaysLabel: 'Nombre de jours prévus en stockage',
          harvestDateLabel: 'Quand la culture a-t-elle été récoltée?',
          harvestDateValues: {
            today: "Aujourd'hui",
            yesterday: 'Hier',
            dayBefore: 'Il y a deux jours',
            evenBefore: 'Même avant',
          },
          cratesError: 'Veuillez saisir un nombre de caisses positif',
          crateWeightError: 'Veuillez saisir un poids de caisse positif',
          harvestDateError: 'La date de récolte est requise',
          modals: {
            weight: 'Définir le poids individuel des caisses',
            id: "Définir l'ID individuel des caisses",
            crateLabel: 'Caisse',
            selectInitialId: "Veuillez définir l'ID de retrait des caisses",
            serialize: 'Sérialiser',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: {
        label: 'Unité de refroidissement : {{name}}',
        header: 'Sélectionnez une unité de refroidissement',
      },
      occupancy: "Occupation actuelle de l'unité de refroidissement",
      week: 'Cette semaine',
      today: "Aujourd'hui",
    },
    CoolingUnitsRoomConditions: {
      heading: 'Historique de la température',
      temperature: 'Température',
      lastUpdated: 'Dernière mise à jour le {{date}}',
      enterTemperature: 'Saisir la température',
      toasts: {
        confirmation: 'Température modifiée correctement',
      },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'Marchandise',
      percentage: 'Pourcentage',
      weight: 'Poids',
      crates: 'Caisses',
      optimalTemp: 'Température optimale (°C)',
      messages: {
        empty:
          "L'occupation des unités de refroidissement et la température apparaîtront ici lorsque vous effectuerez au moins un enregistrement dans une chambre.",
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'Salle à produit unique : {{crop}}',
      multiCommodity: 'Salle multi-produits',
      publicMaker: 'Unité de refroidissement publique',
      usedMarker: 'Unité de refroidissement que vous avez déjà utilisée',
    },
    Company: {
      SelectCompany: {
        label: 'Entreprise : {{name}}',
        header: 'Sélectionner une entreprise',
      },
    },
    ProduceDetails: {
      seeDetails: 'Voir les détails',
      kilogram: 'kg',
      coolingUser: 'Utilisateur de refroidissement',
      contact: 'Contact',
      contactCopied: 'Copié !',
      crates: 'caisses',
      crate: 'caisse',
      cropType: 'Type de culture',
      numberOfCrates: 'Nombre de caisses',
      crateIds: 'ID des caisses',
      combinedWeight: 'Poids total',
      remainingTime: 'Temps restant pour retirer',
      currentStorageDays: 'Jours de stockage actuels',
      plannedDays: 'Jours prévus',
      pricePerDay: 'Prix / jour',
      plannedStorageCost: 'Coût de stockage prévu',
      pickUp: 'Retirer dans',
      days: 'Jours',
      noDTMessage:
        "Un modèle de durée de conservation n'est pas disponible pour cette marchandise particulière.",
      checkOutButton: 'Retirer',
    },
    SearchFilter: {
      detailsMessage:
        "Recherchez un enregistrement en utilisant le type de culture, le nom de l'agriculteur, les jours en stockage, les jours restants en stockage ou le code d'enregistrement",
      idMessage: 'Recherchez une caisse en utilisant le ID pour identifier une caisse spécifique',
      crateDetailsButton: 'Rechercher les détails de la caisse',
      crateIdButton: "Rechercher l'ID de la caisse",
      searchLabel: 'Recherche',
    },
    SortMenu: {
      title: 'Trier par',
      options: {
        cropType: 'Type de culture',
        timeToPick: 'Temps de ramassage',
        checkInDate: 'Date de check-in (du premier au dernier)',
        checkInDateReverse: 'Date de check-in (du dernier au premier)',
        coolingUser: "Nom de l'utilisateur de refroidissement",
      },
    },
    Management: {
      Location: {
        emptyState: "Aucun lieu ajouté pour l'instant. Cliquez sur le signe + pour en ajouter un.",
        text: {
          invited: 'Invité ({{amount}})',
          registered: 'Enregistré ({{amount}})',
        },
        chips: {
          address: 'Adresse',
          coordinates: 'Coordonnées',
          geolocation: 'Géolocalisation par téléphone',
        },
        fields: {
          name: 'Nom',
          latitude: 'Latitude',
          longitude: 'Longitude',
          country: 'Pays',
          state: 'État',
          city: 'Ville',
          zipCode: 'Code postal',
          street: 'Rue',
          streetNumber: 'Numéro de rue',
        },
        modal: {
          message:
            'Cette opération supprimera toutes les unités de refroidissement associées à ce lieu. Voulez-vous continuer?',
        },
        actions: {
          currentLocation: 'Choisir le lieu actuel',
        },
        toasts: {
          addLocationSuccess: 'Lieu ajouté avec succès',
          editLocationSuccess: 'Lieu modifié avec succès',
          removeLocationSuccess: 'Le lieu {{name}} a été supprimé avec succès.',
        },
      },
      Operators: {
        banner:
          "Après avoir ajouté l'utilisateur, il recevra un SMS avec un lien d'invitation, où il pourra activer son compte.",
        text: {
          gender: 'Genre',
          ma: 'Homme',
          fe: 'Femme',
          ot: 'Autre',
        },
        fields: {
          selectCoolingUnit: 'Sélectionner une unité de refroidissement',
          coolingUnits: 'Unité(s) de refroidissement',
        },
        actions: {
          invite: 'Inviter',
          save: 'Enregistrer les modifications',
        },
      },
      AddOperator: {
        messages: {
          operator:
            "Pour rejoindre l'application Coldtivate en tant qu'Opérateur, rendez-vous sur : {{link}}",
        },
        toasts: {
          error: 'Le téléphone est déjà attribué. Essayez un autre numéro',
          success: 'Opérateur invité avec succès',
        },
        phoneFormat: 'Assurez-vous que le numéro de téléphone saisi a un code pays.',
      },
      EditOperator: {
        toasts: {
          success: 'Opérateur modifié avec succès',
        },
      },
      AddCoolingUser: {
        toasts: {
          add: 'Ajouter un utilisateur de refroidissement',
        },
      },
      CompanyDetails: {
        labels: {
          name: 'Nom',
          uploadLogo: 'Télécharger le logo',
          logo: 'Logo',
          country: 'Pays',
          commodity: 'Liste des marchandises',
          currency: 'Devise',
        },
        headings: {
          country: 'Sélectionner un pays',
          commodity: 'Sélectionner une marchandise',
          currency: 'Sélectionner une devise',
        },
        actions: {
          save: 'Sauvegarder les modifications',
        },
        toasts: {
          success: 'Modifié avec succès',
        },
      },
      RegisteredEmployee: {
        invited: 'Invités ({{amount}})',
        registered: 'Enregistrés ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'Pour supprimer votre compte, allez dans les Détails du compte.',
        deleteOther: 'Si vous souhaitez supprimer ce compte, veuillez contacter {{contact}}.',
      },
      AddRegisteredEmployee: {
        message:
          "Pour rejoindre l'application Coldtivate en tant qu'Employé enregistré, rendez-vous sur : {{link}}",
        toasts: {
          success: 'Employé enregistré invité avec succès',
        },
      },
      CoolingUsers: {
        modals: {
          selectMethod: "Comment souhaitez-vous ajouter l'utilisateur?",
          userCode: 'Entrez un code utilisateur',
          userCodeDesc:
            "Vous pouvez trouver le code dans les détails de votre compte si vous êtes enregistré en tant qu'utilisateur de refroidissement.",
          addByCode: 'Ajouter un utilisateur par code',
          addWithDetails: 'Ajouter un utilisateur avec des détails',
        },
        toasts: {
          notFound: "Aucun utilisateur de refroidissement avec ce code utilisateur n'a été trouvé.",
          taken: "Cet utilisateur est déjà dans votre liste d'utilisateurs de refroidissement.",
        },
      },
      EditCoolingUsers: {
        toasts: {
          warning:
            "Ce compte ne peut pas être supprimé car l'utilisateur a des check-ins actifs dans les unités de refroidissement {{names}}. Veuillez informer l'utilisateur de venir dans la pièce pour récupérer ces articles et compléter les check-outs avant de supprimer le compte !",
          confirmation:
            "Êtes-vous sûr de vouloir supprimer cet utilisateur de votre liste d'utilisateurs de refroidissement? Cette opération supprimera cet utilisateur de refroidissement et ne pourra pas être annulée !",
          edit: 'Utilisateur de refroidissement modifié avec succès',
          noCoolingUnits: "Vous n'avez pas encore d'unités de refroidissement",
          updateSuccess: 'Mise à jour réussie',
        },
        pdf: {
          dateRange: 'Plage de dates',
          selectedUnits: 'Unités de refroidissement sélectionnées',
          coolingUnit: 'Unité de refroidissement',
        },
        actions: {
          downloadFarmers: 'Télécharger les données du tableau de bord des agriculteurs',
          completeLater: 'Compléter plus tard',
        },
      },
      CoolingUnit: {
        emptyState:
          'Aucune unité de refroidissement ajoutée à cet emplacement. Cliquez sur le signe + pour en ajouter une.',
      },
      AddCoolingUnit: {
        heading: "Propriétés de l'unité de refroidissement",
        fields: {
          name: "ID de l'unité de refroidissement",
          location: 'Emplacement',
          coolingUnitType: "Comment décririez-vous l'unité?",
          metricUnit: 'Unité',
          price: 'Prix',
          capacityInMetricTons: 'Volume total vide',
          foodCapacityInMetricTons: 'Volume maximal de nourriture',
          roomSizeHeading: "Taille de l'unité de refroidissement",
          length: 'Longueur',
          width: 'Largeur',
          height: 'Hauteur',
          weight: 'Poids',
          roomInsulator: 'Isolant',
          capacityInNumberCrates: 'Nombre maximal de caisses',
          crateWeight: "Poids standard d'une caisse",
          crateSizeHeading: "Dimensions d'une caisse standard",
          editableCheckins: 'Rendre les enregistrements modifiables par les opérateurs',
          sensorAvailable: 'Capteur disponible',
          public:
            'Souhaitez-vous rendre votre unité de refroidissement visible pour les utilisateurs potentiels (emplacement, type de salle, capacité et informations sur les prix)?',
          crops: 'Commodités',
          selectCrops: 'Sélectionner les commodités',
          refrigerantType: 'Type de réfrigérant utilisé',
          amountRefrigerant: 'Quantité de réfrigérant',
          powerConsumptionInMt: "Consommation électrique de l'unité de refroidissement par MT",
          dailyRoomWattage: 'Consommation en watt du local par jour',
          powerSource: "Comment l'unité de refroidissement est-elle alimentée?",
          powerSourceDieselConsumptionKwh: 'Consommation de diesel du générateur par kWh',
          pvPanelType: 'Type de panneaux PV',
          pvPanelCount: 'Nombre de panneaux PV',
          pvPanelSize: "Taille d'un panneau",
          pvPanelWeight: "Poids d'un panneau",
          pvPanelMaxPower: "Puissance maximale d'un panneau",
          powerSourceDieselPercent: 'Générateur diesel',
          powerSourceGridPercent: 'Réseau',
          powerSourcePvPercent: 'Panneaux PV',
          powerSourceBiomassPercent: 'Biomasse',
          electricityStorageSystem: "Système de stockage d'électricité",
          thermalStorageMethod: 'Méthode de stockage thermique',
          batteryCount: 'Nombre de batteries',
          batteryWeight: 'Taille de la batterie',
          batteryCapacity: "Capacité d'une batterie",
          batteryMaxCurrent: "Courant de charge maximal d'une batterie",
          batteryPeakEnergyStorage: "Stockage d'énergie au niveau de pointe d'une batterie",
          batteryType: 'Type de batteries',
          selectSensorType: 'Sélectionner un type de capteur',
          addTempSensor: 'Ajouter un capteur de température à votre unité de refroidissement',
          sensorDesc: {
            default:
              "Si vous ne l'avez pas en main, demandez ces informations à votre fournisseur de capteurs.",
            ubibot: 'Trouvez ces informations dans votre compte ubibot.',
          },
          ecozen: {
            username: "Nom d'utilisateur",
            password: 'Mot de passe',
            machineId: 'ID de la machine',
          },
          ubibot: {
            accountKey: 'Clé de compte',
            channelId: 'ID du canal',
            sensorFieldTitle: 'Sélectionnez votre champ de capteur',
            sensorFieldDesc: 'Sélectionnez votre champ de capteur',
            field: 'Champ',
          },
          figorr: {
            apiKey: 'Clé API',
            deviceTag: "Étiquette de l'appareil",
          },
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: "C'est une salle de stockage située à la porte de la ferme",
          MARKET_STORAGE_ROOM: "C'est une salle de stockage située sur le marché",
          MOVABLE_UNIT: "C'est une unité mobile (par exemple, un camion réfrigéré)",
          OTHER: 'Autre',
        },
        pricing: {
          label: 'Type de prix',
          PERIODICITY: 'Par jour',
          FIXED: 'Fixe',
          day: 'jour',
        },
        metricUnit: {
          label: 'Unité',
          KILOGRAMS: 'kg',
          CRATES: 'Caisse',
        },
        toasts: {
          addSuccess: 'Unité de refroidissement ajoutée avec succès',
          integrationError:
            'Impossible de se connecter au capteur. Validez vos données ou contactez votre fournisseur de capteurs.',
          integrationSuccess:
            "Identification des informations d'authentification du capteur réussie.",
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            'Cette opération supprimera cette unité de refroidissement ainsi que son historique. Voulez-vous continuer?',
        },
        buttons: {
          viewExisting: "Voir l'existant",
          editPricing: 'Modifier les prix',
        },
        toasts: {
          editSuccess: 'Unité de refroidissement modifiée avec succès',
          cantDelete:
            'Cette unité de refroidissement ne peut pas être supprimée car elle a des enregistrements actifs.',
          successDelete: "L'unité de refroidissement {{name}} a été supprimée avec succès.",
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'Sélectionner les jours:',
        empty:
          'Les enregistrements et les sorties apparaîtront dans le tableau de bord après avoir effectué au moins un enregistrement dans une pièce.',
        downloadDataButton: 'Télécharger les données',
        modal: {
          title: 'Configurer les paramètres',
          coolingUnitSelection: "Sélectionner l'unité de refroidissement :",
        },
        summary: {
          totalCheckIns: "Nombre total d'enregistrements :",
          totalCrates: 'Nombre total de caisses :',
          totalWeight: 'Poids total :',
          totalUsers: "Nombre total d'utilisateurs distincts :",
          weightUnit: 'kg',
        },
      },
      RevenueAnalysis: {
        summary: {
          total: 'Revenu total',
        },
        paymentType: {
          label: 'Sélectionner les méthodes de paiement :',
          cash: 'Espèces',
          creditCard: 'Carte de Crédit',
        },
      },
    },
    AccountDetails: {
      popups: {
        default: 'Êtes-vous sûr de vouloir supprimer votre compte?',
        lastRegisteredEmployee:
          "Vous êtes le seul Employé enregistré de l'entreprise, cette action supprimera l'entreprise !",
        activeCheckInOP:
          "Les unités de refroidissement {{names}} auxquelles vous êtes affecté ont des check-ins actifs et vous êtes le dernier opérateur dans celle-ci. Vous devez vérifier tous les produits ou demander à un Employé enregistré d'assigner un autre opérateur à cette unité de refroidissement avant de pouvoir supprimer votre compte !",
        activeCheckInRE:
          "Vous ne pouvez pas supprimer votre compte si vous êtes le dernier Employé enregistré et qu'il y a des check-ins actifs sur certaines unités de refroidissement, car cette action supprimerait votre entreprise. Veuillez vous assurer que tous les check-ins actifs dans les unités de refroidissement {{names}} sont effectués avant de tenter de supprimer votre compte.",
        activeCheckInCU:
          "Vous ne pouvez pas supprimer votre compte car vous avez des check-ins actifs dans les unités de refroidissement {{names}}. Veuillez vérifier ces articles avant d'essayer à nouveau de supprimer votre compte !",
      },
      fields: {
        location: 'Emplacement',
        userCode: "Code d'importation de l'utilisateur de refroidissement",
      },
      toasts: {
        success: 'Mise à jour réussie',
      },
      sections: {
        sellerSettings: 'Paramètres du vendeur',
        buyerSettings: "Paramètres de l'acheteur",
        details: 'Détails',
      },
      PayoutSettings: {
        addTitle: 'Veuillez insérer les informations de votre compte bancaire',
        editTitle: 'Les informations de votre compte bancaire',
        form: {
          nameLabel: 'Nom complet',
          namePlaceholder: 'Ex. : John Doe',
          accountNumberLabel: 'Numéro de compte',
          accountNumberPlaceholder: 'Insérez le numéro de compte',
          bankLabel: 'Nom de la banque',
          bankPlaceholder: 'Insérez le nom de la banque',
          errors: {
            name: 'Le nom complet est requis',
            account: 'Le numéro de compte est requis',
            bank: 'Le nom de la banque est requis',
          },
        },
        successMessage: 'Compte bancaire ajouté avec succès.',
        errorMessage: 'Une erreur est survenue. Veuillez réessayer plus tard.',
      },
      PaymentSettings: {
        cards: 'Cartes',
        creditCard: {
          predefined: 'Prédéfinie',
          owner: 'Nom du Titulaire',
          date: "Date d'Expiration",
          cvv: 'CVV',
        },
        AddCreditCard: {
          title: 'Veuillez insérer les informations de votre carte',
          form: {
            cardName: 'Nom de la carte',
            cardNamePlaceholder: 'Insérez le nom de la carte',
            cardNumber: 'Numéro de carte',
            cardNumberPlaceholder: 'Insérez le numéro de la carte',
            expiryDate: "Date d'expiration",
            securityCode: 'Code de sécurité',
            securityCodePlaceholder: 'Insérez le code de sécurité de la carte',
            predefinedMethod: 'Méthode de paiement prédéfinie',
            successMessage: 'Carte ajoutée avec succès',
            cardNameError: 'Le nom sur la carte est requis',
            cardNumberError: 'Le numéro de la carte est requis',
            securityCodeError: 'Le code de sécurité est requis',
          },
        },
      },
    },
    About: {
      runtimeAgree: 'Accord de Runtime Comsol',
      userLicense: 'Contrat de Licence Utilisateur Final',
      privacyPolicy: 'Politique de Confidentialité',
      comsolAbout: 'À propos de Comsol',
    },
    KnowledgeHub: {
      comic: 'Voyage du fermier : Bande dessinée',
      cooling: "Qu'est-ce que le Cooling-as-a-Service?",
      quality: 'Comment maximiser la qualité des cultures',
      optimal: 'Conditions de stockage optimales dans des chambres froides multi-produits',
      table: 'Tableau de stockage des cultures',
      sensors: 'Capteurs de température et modèle Time-to-Pick-Up',
      tips: "Conseils pour l'enregistrement des caisses",
      glitches: 'Comment réagir aux problèmes techniques dans la chambre froide',
      source: "Source : veuillez consulter le Manuel des Opérateurs pour plus d'informations :",
      clickHere: 'Cliquez ici',
    },
    History: {
      priceLabel: 'Prix',
      empty:
        "Les enregistrements d'entrée et de sortie apparaîtront sur le tableau de bord lorsque vous aurez effectué au moins un enregistrement d'entrée dans une chambre.",
      sortMenuOptions: {
        cropType: 'Type de culture',
        movementDate: 'Date de mouvement (du plus ancien au plus récent)',
        movementDateReverse: 'Date de mouvement (du plus récent au plus ancien)',
        checkInFirst: "Enregistrement d'entrée en premier",
        checkOutFirst: 'Enregistrement de sortie en premier',
        coolingUser: "Nom de l'utilisateur de refroidissement",
      },
      optionsMenu: {
        common: {
          pdfReceipt: 'Télécharger le reçu PDF',
        },
        checkOut: {
          seeDetails: 'Voir les détails',
          smsReceipt: 'Télécharger le reçu SMS',
          marketSurvey: "Remplir l'enquête de marché",
        },
        checkIn: {
          edit: "Modifier l'enregistrement d'entrée",
        },
      },
      detailsModal: {
        operatorNameLabel: "Nom de l'opérateur de sortie",
        operatorNumberLabel: "Numéro de l'opérateur de sortie",
        checkOutDateLabel: 'Date de sortie',
        marketSurveyLabel: 'Enquête de marché complétée',
        cratesLabel: 'Caisses',
        combinedWeightLabel: 'Poids total',
        paymentMethodLabel: 'Méthode de paiement',
        cropTypeLabel: 'Type de culture',
        checkInCodeLabel: "Code d'entrée",
        crateIdsLabel: 'IDs des caisses',
      },
      pdfModal: {
        coolingUserLabel: 'Utilisateur de refroidissement',
        dateLabel: 'Date',
        weightLabel: 'Poids (Kg)',
        downloadButton: 'Télécharger la facture',
        downloadName: '{{code}}-receipt',
        successMessage: 'Reçu téléchargé !',
        errorMessage: 'Une erreur est survenue. Veuillez réessayer plus tard.',
        checkOut: {
          title: 'Entreprise',
          checkOutLabel: 'Code de sortie',
          idLabel: 'ID',
          itemLabel: 'Article',
          calculatedPriceLabel: 'Prix calculé',
          discountLabel: 'Remise',
          totalPrice: 'Prix total',
        },
        checkIn: {
          title: "Reçu d'entrée",
          operatorLabel: 'Opérateur',
          codeLabel: "Code d'entrée",
          companyLabel: 'Entreprise',
          coolingUnitLabel: 'Unité de refroidissement',
          priceLabel: 'Prix {{currency}} / Jour',
          cropLabel: 'Culture',
          numberOfCratesLabel: 'Nombre de caisses',
          totalLabel: 'Total',
        },
      },
      editCheckIn: {
        contactLabel: 'Contact',
        coolingUserLabel: 'Utilisateur de refroidissement',
        disclaimer: 'Avertissement : Le temps de collecte est un nombre estimé de jours.',
        disclaimerMessage:
          "Avertissement : Notez que le temps de collecte est un nombre estimé de jours. Cette estimation est basée sur des modèles calibrés pour l'espèce de fruit ou de légume et une simulation numérique. La qualité réelle du produit dépend également des conditions climatiques locales, des conditions de croissance, de la date de récolte et d'autres facteurs. Par conséquent, des écarts par rapport à notre estimation du temps de collecte peuvent se produire.",
        selectCropLabel: 'Sélectionner une culture',
        successMessage: "Enregistrement d'entrée mis à jour avec succès !",
        errorMessage: "Échec de la mise à jour de l'enregistrement d'entrée. Veuillez réessayer.",
      },
      survey: {
        fillMessage: "Veuillez remplir l'enquête de base pour {{crop}} !",
        baseSurvey: {
          occupationQuestion: 'Quelle est la meilleure description de votre occupation?',
          occupationFarmer: 'Un agriculteur',
          occupationTrader: 'Un petit commerçant/vendeur/grossiste',
          usageQuestion: 'Avez-vous utilisé la chambre froide dans le passé?',
          newUser: 'Non, je suis un nouvel utilisateur',
          oldUser: "Oui, j'ai utilisé la chambre froide",
          mostUsedCommoditiesQuestion: 'Cultures les plus récoltées/commercialisées?',
          commodity: 'Culture',
          newCommodity: 'Culture {{index}}',
          fillCommoditiesMessage:
            "Veuillez répondre aux questions ci-dessous pour les cultures que vous prévoyez d'apporter plus souvent dans la chambre.",
          addCommodityButton: 'Ajouter une culture',
          genericFormError: 'Veuillez sélectionner une option',
          experienceError: 'Veuillez entrer une valeur',
        },
        marketSurvey: {
          title:
            'Veuillez répondre aux questions suivantes pour les caisses de {{crop}} que vous avez sorties.',
          locationQuestion: 'Où avez-vous vendu votre production?',
          locations: {
            farm: 'A la ferme',
            market: 'Marché local',
            both: 'À la ferme et au marché',
          },
          priceQuestion: 'Quel prix avez-vous reçu?',
          spoiledProducesQuestion:
            'Combien de ce qui était en stockage la semaine dernière a été gâté ou vendu en dessous du prix moyen du marché?',
          spoilageReasonsQuestion: 'Quelle est la principale raison du gâtage des cultures?',
          formError: 'Veuillez sélectionner une option',
        },
      },
      stringTemplates: {
        sendSMS: `{{companyName}} - {{movementType}} Reçu :
        Code de mouvement : {{code}}
        Cultures : {{crops}}
        Poids total : {{weight}} Kg
        {{movementTypeForDate}} : {{date}}
        Prix : {{price}}
        Payé par : {{farmersName}}
        `,
        movementType: {
          checkOut: 'Sortie',
          checkIn: 'Entrée',
          checkedOut: 'Sorti',
          checkedIn: 'Entré',
        },
      },
    },
    Analytics: {
      emptyState: 'Aucune donnée à afficher',
      company: 'Entreprise',
      aggregated: 'Agrégé',
      comparison: 'Comparaison',
      downloadDataButton: 'Télécharger les données',
      users: 'Utilisateurs',
      impact: 'Impact',
      maleLabel: '👨🏽 Homme: {{amount}}',
      femaleLabel: '👩🏽 Femme: {{amount}}',
      otherLabel: 'Autre: {{amount}}',
      usersTotal: "Nombre total d'utilisateurs de refroidissement = {{amount}}",
      operatorsTotal: "Nombre total d'opérateurs = {{amount}}",
      beneficiariesTotal: 'Nombre total de bénéficiaires indirects = {{amount}}',
      totalCratesLabel: '🧺 Total des caisses',
      totalQuantityLabel: '📦 Quantité totale (kg)',
      totalOperations: '👷🏽‍♂️ Total des opérations',
      checkedInLabel: 'Enregistré: {{amount}}',
      checkedOutLabel: 'Désenregistré: {{amount}}',
      methodologyButton: 'Voir la méthodologie',
      farmersAnalytics: {
        coolingUserName: "Nom de l'utilisateur de refroidissement",
        coolingUserType: "Type d'utilisateur de refroidissement",
        avgStorageTime: 'Temps moyen de stockage',
        coldStorageCost: 'Coût du stockage à froid',
        days: 'jour(s)',
        baselineSurveyButton: 'Remplir les enquêtes de base',
        baseLineSurveyMessage: 'Vous avez {{amount}} enquêtes à compléter 😟',
        postCheckOutSurveyButton: 'Remplir les enquêtes post-check-out',
        postCheckOutSurveyMessage: 'Vous avez {{amount}} enquêtes à compléter 😟',
        noChangeFoodLoss: 'Aucun changement dans la perte de nourriture',
        increaseInFoodLoss: 'Augmentation de la perte de nourriture',
        decreaseInFoodLoss: 'Réduction de la perte de nourriture',
        increaseInRevenue: 'Augmentation des revenus',
        decreaseInRevenue: 'Réduction des revenus',
        foodLossEvolution: '🥗 Évolution de la perte de nourriture par culture (top 5)',
        changePercentage: '% Changement',
        crops: 'Cultures',
        foodLossLevels: 'Niveaux de perte de nourriture',
        revenueEvolution: '💰 Évolution moyenne des revenus',
        revenueCropEvolution: '💰 Évolution moyenne des revenus par culture (top 5)',
        noChangeRevenue: 'Aucun changement dans les revenus',
        revenueLevels: 'Niveaux de revenus',
        baselineSurveyLabel: "📊 Nombre d'enquêtes de base complètes",
        postCheckoutSurveyLabel: "📊 Nombre d'enquêtes post-check-out complètes",
        allPostCheckoutSurveysCompleted: 'Toutes les enquêtes post-check-out complètes 🤝',
        allBaselineSurveysCompleted: 'Toutes les enquêtes de base complètes 🤝',
      },
      companyTab: {
        usersTab: {
          employeesTotal: "Nombre total d'employés enregistrés = {{amount}}",
          usersType: "Type d'utilisateurs de refroidissement",
          farmersLabel: '🧑🏽‍🌾 Agriculteurs: {{amount}}',
          tradersLabel: '👩🏽‍💼 Commerçants: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'Occupation moyenne des unités de refroidissement:',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: '🥗 Évolution de la perte de nourriture',
          revenueLabel: '💰 Évolution des revenus des utilisateurs de refroidissement',
          co2Label: '💨 Évolution des émissions de CO2e',
          surveysAmountLabel:
            "📊 Nombre d'enquêtes utilisées pour calculer l'évolution de la perte de nourriture et des revenus",
          co2Increase: 'Augmentation des émissions de CO2e par kg de produit avec refroidissement',
          co2Decrease: 'Réduction des émissions de CO2e par kg de produit avec refroidissement',
          co2WithoutCooling: 'Kg de CO2e par kg de produit émis sans refroidissement',
          co2WithCooling: 'Kg de CO2e par kg de produit émis avec refroidissement',
          from: 'De',
          to: 'À',
        },
        downloadFileName: 'analytics-data',
        utilization: 'Utilisation',
        goBackButton: 'Retour à la page principale',
        companyNameLabel: "Nom de l'entreprise",
        revenueLabel: 'Revenu total',
        coolingUnitsLabel: "Nombre d'unités de refroidissement",
        singleCoolingUnitContent: '1 unité',
        coolingUnitsContent: '{{amount}} unités',
        capacityLabel: 'Capacité totale de refroidissement',
        capacityContent: '{{amount}} tonnes métriques',
        coolingUnitTypeLabel: "Type d'unité de refroidissement",
        coolingUnitTypeMarket: '{{amount}} salle de marché',
        coolingUnitTypeFarmGate: '{{amount}} salle de ferme',
        coolingUnitTypeMovable: '{{amount}} salle mobile',
      },
      tabsShared: {
        configurationMessage: 'Veuillez configurer vos dates et unités de refroidissement',
        configureButton: 'Configurer',
        crates: 'Caisses',
        dateRangeLabel: 'Plage de dates:',
        selectedUnitsLabel: 'Unités de refroidissement sélectionnées:',
        totalCo2Label: '💨 Total des émissions de CO2e:',
        roomRevenue: '📈 Revenu par salle',
      },
      comparisonTab: {
        sortingLabel: 'Triage',
        coolingUnit: 'Unité de refroidissement',
        genderHeader: 'Homme | Femme | Autre',
        genderSecondaryHeader: 'Homme | Femme',
        total: 'Total',
        sortingMenuOptions: {
          descending: 'Ordre décroissant',
          ascending: 'Ordre croissant',
          coolingUnitName: "Nom de l'unité de refroidissement",
        },
        usersTab: {
          operators: 'Opérateurs',
          users: 'Utilisateurs actifs de refroidissement',
          activeUsers: 'Utilisateurs actifs',
          beneficiaries: 'Bénéficiaires',
        },
        cratesTab: {
          crates: 'Caisses',
          kg: 'kg',
          operations: 'Opérations',
          checkedIn: 'Enregistré',
          checkedOut: 'Désenregistré',
          checkedInCropDistribution: '🧺 Distribution des cultures enregistrées (caisses)',
          checkedInKgDistribution: '⚖️ Distribution des cultures enregistrées (kg)',
          checkInCropDistribution: 'Distribution des cultures enregistrées',
          checkedOutCropDistribution: '🧺 Distribution des cultures désenregistrées (caisses)',
          checkedOutKgDistribution: '⚖️ Distribution des cultures désenregistrées (kg)',
          checkOutCropDistribution: 'Distribution des cultures désenregistrées',
          co2: '💨 Émissions de CO2e',
          co2EmissionsLabel: 'Émissions de CO2e (kg)',
          co2DistributionLabel: 'Distribution des émissions de CO2e',
        },
        impactTab: {
          occupancyLabel: '🏘️ Occupation moyenne des unités de refroidissement',
          occupancy: 'Occupation',
          foodLossLabel: '🥗 Évolution de la perte de nourriture',
          revenueLabel: '💰 Évolution des revenus',
          changePercentage: '% Changement',
          completePercentage: '% Complet',
          foodLossLevels: 'Niveaux de perte de nourriture',
          revenueLevels: 'Niveaux de revenus',
          revenuePerRoomLabel: '📈 Revenu par salle',
          co2Label: '💨 Évolution des émissions de CO2e',
          surveysAmountLabel:
            "📊 Nombre d'enquêtes utilisées pour calculer la perte de nourriture et l'évolution des revenus",
          co2EmissionsLabel: 'Émissions de CO2e (kg)',
        },
      },
    },
    Notifications: {
      text: {
        notifications: 'Notifications',
      },
      sensorError:
        "Le capteur pour la chambre froide {{unitName}} n'a pas envoyé de données au cours des 12 dernières heures. Veuillez entrer les données manuellement en attendant que le problème soit résolu.",
      survey:
        "Veuillez remplir l'enquête de marché pour {{farmer}}, pour le mouvement, {{movementCode}}.",
      link: 'Veuillez aller ici pour le compléter.',
      coolingUserSurvey:
        "Vous avez enregistré {{crop}} mais vous n'avez pas complété l'enquête pour cette culture.",
      operatorSurvey:
        "Vous avez enregistré {{crop}} pour {{farmer}} mais vous n'avez pas complété l'enquête pour cette culture.",
      pickup:
        "Vos caisses de {{crop}} doivent être retirées dès que possible ! (date d'enregistrement : {{checkIn}}, ID de l'unité de refroidissement : {{unitId}}, ID d'enregistrement : {{movementCode}}).",
      notifyCoolingUser:
        "Veuillez informer l'utilisateur {{farmer}} que ses caisses de {{crop}} doivent être retirées dès que possible ! (date d'enregistrement : {{checkIn}}, ID de l'unité de refroidissement : {{unitId}}, ID d'enregistrement : {{movementCode}}).",
      checkIn: "L'opérateur {{farmer}} a modifié l'enregistrement {{movementCode}} le {{date}}.",
      surveyAlreadyFilled: "L'enquête a déjà été remplie",
    },
  },
} satisfies Translations;
