import { Translations } from './en';

export default {
  languages: {
    current: 'Inglês',
    label: 'Idioma',
    options: {
      en: 'Inglês',
      hi: 'Hindi',
      or: 'Oriya',
      gu: 'Gujarati',
      fr: 'Francês',
      pt: 'Português',
    },
  },
  gender: {
    female: 'Feminino',
    male: 'Masculino',
    other: 'Outro',
  },
  navigation: {
    auth: {
      SignIn: 'Entrar',
      SignUp: 'Registar',
      ForgotPassword: 'Esqueceu-se da Palavra-passe?',
      PasswordReset: 'Redefinir',
      AppInfo: 'Informações da App',
    },
    management: {
      Root: 'Gestão',
      CompanyDetails: 'Detalhes da Empresa',
      RevenueAnalysis: 'Análise de Receita',
      UsageAnalysis: 'Análise de Utilização',
      Locations: 'Localizações',
      AddLocation: 'Adicionar Localização',
      EditLocation: 'Editar Localização',
      CoolingUnits: 'Unidades de Refrigeração',
      CoolingUsers: 'Utilizadores de Refrigeração',
      AddCoolingUser: 'Adicionar Utilizador de Refrigeração',
      EditCoolingUser: 'Editar Utilizador de Refrigeração',
      AddCoolingUnit: 'Adicionar Unidade de Refrigeração',
      EditCoolingUnit: 'Editar Unidade de Refrigeração',
      Operators: 'Operadores',
      AddOperator: 'Adicionar Operador',
      EditOperator: 'Editar Operador',
      RegisteredEmployee: 'Funcionário Registado',
      AddRegisteredEmployee: 'Adicionar Funcionário Registado',
      RegisteredEmployeeDetails: 'Detalhes do Funcionário Registado',
    },
    bottomTabs: {
      RootMainTabStack: 'Coldtivate de {{firstName}}',
      ProduceDetails: '{{produceCode}}',
      PriceTrend: 'Tendência de Preços',
      PriceRanking: 'Classificação de Preços',
      Planner: 'Planeador',
      RoomConditions: 'Condições da Sala',
      CratesInfo: 'Informação das Caixas',
      Dashboard: 'Painel de Controlo',
      History: 'Histórico',
      MarketPrice: 'Preço de Mercado',
      CoolingUnits: 'Unidades de Refrigeração',
      Analytics: 'Análises',
      CheckIn: 'Check-In',
      CheckOut: 'Check-Out',
      Maps: 'Mapas',
    },
    dashboard: {
      AccountDetails: 'Detalhes da Conta',
      KnowledgeHub: 'Centro de Conhecimento',
      QuitTutorial: 'Sair do Tutorial',
      FAQ: 'Perguntas Frequentes',
      About: 'Sobre',
      Management: 'Gestão',
      Tutorial: 'Tutorial',
    },
    checkIn: {
      SelectCropType: 'Selecione Tipo de Cultura',
      CheckIn: 'Check-In',
      CropList: '{{cropType}}',
      CrateSetup: 'Check-In',
    },
    about: {
      comsolAgreement: 'Acordo de Licença COMSOL Runtime 6.0',
      userLicense: 'ACORDO DE LICENÇA DE UTILIZADOR FINAL',
      aboutComsol: 'Sobre a COMSOL',
      privacyPolicy: 'Política de Privacidade',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: 'Questionário de Mercado para {{farmer}}',
      BaseSurvey: 'Questionário do Utilizador de Refrigeração',
    },
    analytics: {
      methodology: 'Metodologia',
    },
  },
  actions: {
    error: 'Ocorreu um erro',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    import: 'Importar',
    yes: 'Sim',
    no: 'Não',
    select: 'Selecione',
    close: 'Fechar',
    delete: 'Eliminar',
    ok: 'Ok',
    all: 'Todos',
    none: 'Nenhum',
    next: 'Seguinte',
    back: 'Voltar',
    search: 'Pesquisar...',
    or: 'ou',
    add: 'Adicionar',
    edit: 'Editar',
    go: 'Avançar!',
    done: 'Concluído',
    'not-available': 'N/D',
    'complete-later': 'Concluir mais tarde',
    'update-success': 'Atualizado com sucesso',
    'save-changes': 'Guardar alterações',
    continue: 'Continuar',
  },
  components: {
    datePicker: {
      clearButtonLabel: 'Limpar',
      confirmButtonLabel: 'Confirmar',
      placeholder: 'dd/mm/aaaa',
      startDateSelection: 'Selecione data de início',
      endDateSelection: 'Selecione data de fim',
    },
  },
  Auth: {
    Root: {
      welcome: 'Bem-vindo ao Coldtivate',
      signIn: 'Iniciar Sessão',
      signUpCompany: 'Registar como Empresa',
      signUpCoolingUser: 'Registar como Utilizador de Refrigeração',
      appInfo: 'Informações da App',
    },
    SignIn: {
      heading: 'Iniciar Sessão',
      accounts: {
        registeredEmployee: {
          label: 'Funcionário Registado',
          description:
            'Parte da equipa de gestão do fornecedor da refrigeração. Um funcionário registado pode registar a empresa na app e convidar outros funcionários a aderir. Os funcionários registados podem iniciar sessão com email ou número de telefone.',
        },
        operator: {
          label: 'Operador',
          description:
            'Funcionário fisicamente presente na unidade de refrigeração e que gere as operações de check-in e check-out. Os operadores podem ser convidados por funcionários registados para aderir à empresa. Os operadores podem iniciar sessão com um número de telefone.',
        },
        coolingUser: {
          label: 'Utilizador de Refrigeração',
          description:
            'O utilizador da unidade de refrigeração. Agricultores, comerciantes, retalhistas que tenham acesso a um smartphone podem iniciar sessão aqui. Os utilizadores da unidade de refrigeração sem smartphone podem aceder às informações da app visitando uma unidade de refrigeração e interagindo com o operador.',
        },
        toasts: {
          login:
            'O nome de utilizador ou a palavra-passe estão incorretos. Por favor, confirme que selecionou o tipo de utilizador correto',
          success: 'Sessão iniciada com sucesso',
        },
      },
      form: {
        user: {
          placeholder: 'Email/Número de Telefone',
          description: {
            default: 'Por favor, forneça um número de telefone válido (com código de país).',
            registeredEmployee:
              'Por favor, forneça um email/número de telefone válido (com código de país).',
          },
          messages: {
            default: 'O número de telefone é obrigatório.',
            registeredEmployee: 'É necessário um endereço de email ou um número de telefone.',
          },
        },
        password: {
          placeholder: 'Palavra-passe',
          messages: {
            required: 'A palavra-passe é obrigatória',
          },
        },
        actions: {
          logIn: 'Iniciar Sessão',
        },
      },
    },
    SignUp: {
      select: {
        header: 'Selecione um {{fieldName}}',
        label: 'Pesquisar...',
        cancel: 'Cancelar',
        ok: 'OK',
      },
      welcome: 'Bem-vindo ao Coldtivate',
      schema: {
        passwordError:
          'A sua palavra-passe deve ter pelo menos 8 caracteres, conter uma letra maiúscula e uma minúscula, e um número.',
        confirmPasswordError: 'A confirmação da palavra-passe é obrigatória.',
        passwordsMismatchError: 'As palavras-passe não correspondem.',
        countryError: 'A seleção de país é obrigatória.',
        firstNameError: 'O primeiro nome é obrigatório.',
        lastNameError: 'O apelido é obrigatório.',
        phoneError: 'O número de telefone é obrigatório.',
        invalidPhoneError: 'O número de telefone é inválido.',
        languageError: 'A seleção de idioma é obrigatória.',
        genderError: 'A seleção de género é obrigatória.',
        termsError: 'É necessário aceitar os Termos de Uso.',
        companyError: 'O nome da empresa é obrigatório.',
        currencyError: 'A seleção de moeda é obrigatória.',
        emailError: 'O email é obrigatório.',
        malformedEmailError: 'Email inválido.',
      },
      commonForm: {
        firstNameLabel: 'Primeiro Nome',
        lastNameLabel: 'Apelido',
        phoneLabel: 'Número de Telefone (com código de país)',
        passwordLabel: 'Palavra-passe',
        confirmPasswordLabel: 'Confirmar Palavra-passe',
        countryFieldName: 'país',
        genderFieldName: 'género',
        terms:
          'Aceito o Acordo de Licença do Utilizador do Coldtivate, a Política de Privacidade e os Termos de Uso da COMSOL',
        submit: 'Registar',
      },
      SignUpCompany: {
        companyHeader: 'Registar Empresa',
        userHeader: 'Registar Funcionário Registado',
        companyNameLabel: 'Nome da Empresa',
        emailLabel: 'Email',
        currencyFieldName: 'moeda',
        modal: {
          warning: 'Se se registar sem um telefone, algumas funcionalidades não irão funcionar:',
          reasons: {
            1: 'Reposição de conta',
            2: 'Receção de recibos por sms',
          },
          buttons: {
            continue: 'Continuar Mesmo Assim',
            addPhone: 'Adicionar Telefone',
          },
        },
      },
      SignUpCoolingUser: {
        header: 'Registar Utilizador de Refrigeração',
        languageFieldName: 'idioma',
      },
    },
    ForgotPassword: {
      heading: 'Esqueceu-se da Palavra-passe',
      messageSentNotification:
        'Se o número de telefone existir, foi enviado um sms para redefinir a sua palavra-passe.',
      instructions:
        'Para redefinir a sua palavra-passe, por favor, insira o número de telefone com o respetivo código de país, ao qual a conta está ligada.',
      phoneInputLabel: 'Número de Telefone',
      resetButton: 'Redefinir',
      link: {
        partOne: 'Clique neste link para redefinir a sua palavra-passe {{baseLink}}',
      },
    },
    ResetPassword: {
      schema: {
        passwordError:
          'A sua palavra-passe deve ter pelo menos 8 caracteres, conter uma letra maiúscula e uma minúscula, e um número.',
        confirmPasswordError: 'A confirmação da palavra-passe é obrigatória.',
        passwordsMismatchError: 'As palavras-passe não correspondem.',
      },
      passwordLabel: 'Nova Palavra-passe',
      confirmPasswordLabel: 'Confirmar Palavra-passe',
      resetButton: 'Redefinir',
    },
    Invite: {
      heading: 'Bem-vindo ao Coldtivate',
      employee:
        'Foi convidado como Funcionário. Por favor, preencha o formulário para concluir o seu registo.',
      operator:
        'Foi convidado como Operador. Por favor, preencha o formulário para concluir o seu registo.',
      fields: {
        password:
          'Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma minúscula e um número.',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'Alerta de temperatura',
      subtitle: 'Notámos uma alteração. Estes são os produtos atualmente em armazenamento.',
      edit: 'Deseja alterar a temperatura?',
      temperature: 'Temperatura',
      newTemperature: 'Nova temperatura',
      confirm: 'Confirmar nova temperatura',
      continueWithoutUpdate: 'Continuar sem atualizar',
      sensorHint:
        'Não é possível adicionar a temperatura porque um sensor está conectado à unidade de refrigeração.',
    },
    emptyGeneral: 'No momento, não há dados disponíveis.',
    emptyCoolingUser:
      'Os itens em armazenamento aparecerão no painel quando você realizar pelo menos um check-in em qualquer sala.',
    noCompanyAvailable: 'Nenhuma empresa disponível',
    noCoolingUnitAvailable: 'Nenhuma unidade de refrigeração disponível',
    noLocationsAvailable:
      'Bem-vindo ao Coldtivate. Comece adicionando localizações ao seu aplicativo no painel de gestão.',
    MarketPrice: {
      emptyState: 'Os preços de mercado não estão disponíveis no seu país',
      commodityLabel: 'Produto',
      commodityModalTitle: 'Selecione um produto',
      Trend: {
        title: 'Selecione um produto e um estado para obter uma previsão de preço',
        emptyState: 'Nenhum dado encontrado para esta combinação de mercado e produto',
        pastLabel: 'Passado',
        stateLabel: 'Estado',
        stateModalTitle: 'Selecione um estado',
        forecastLabel: 'Previsão',
        chartLabel: 'Preço em {{currency}}/Kg',
      },
      Ranking: {
        filter: 'Filtrar por localização',
        monthLabel: 'Meses',
        monthModalTitle: 'Selecione os meses',
        stateModalTitle: 'Selecione os estados',
        stateLabel: 'Estados',
        table: {
          column1: 'Estado',
          column2: 'Data',
          column3: 'Preço em {{currency}}/Kg',
          emptyState: 'Nenhum valor disponível',
        },
      },
    },
    CrateManagement: {
      userModalTitle: 'Selecione um utilizador de refrigeração',
      coolingUserLabel: 'Utilizador de refrigeração',
      selectCoolingUnitLabel: 'Selecione uma unidade de refrigeração',
      coolingUnitLabel: 'Unidade de refrigeração',
      noUnitWarning: 'Por favor, selecione uma unidade de refrigeração',
      noCratesWarning:
        'O Utilizador de Refrigeração selecionado não tem paletes nesta unidade de refrigeração',
      operationError: 'Algo correu mal. Por favor, tente novamente mais tarde.',
      FarmerSurvey: {
        warningMessage: 'Por favor, preencha o questionário de referência para {{crop}}!',
        modal: {
          weeklyQuantityQuestion:
            'Qual é a quantidade de {{crop}} que você produz ou comercializa por semana?',
          cropSpoilageQuestion: 'Qual é a principal razão para o desperdício de colheitas?',
          marketPriceQuestion: 'Preço médio de mercado por semana ao vender {{crop}}',
          quantityDistributionQuestion: 'Quanto disso é:',
          selfConsumed: 'Consumido ({{unit}})',
          sold: 'Vendidos ({{unit}})',
          lost: 'Perdido ou vendido abaixo do preço de mercado ({{unit}})',
          totalQuantity: 'Quantidade total produzida por semana',
          unitWeight: 'Cada {{crate}} é',
          selectSpoilageReasonsPlaceholder: 'Selecione todas as razões que se aplicam',
          priceLabel: 'Preço',
          priceUnit: 'por {{unit}}',
          commodityShortlist: 'Lista de produtos',
          unit: {
            kg: 'Kg',
            crates: 'Paletes',
            boxes: 'Caixas',
            sacks: 'Sacos',
            baskets: 'Cestas',
            singular: {
              kg: 'kg',
              crates: 'palete',
              boxes: 'caixa',
              sacks: 'saco',
              baskets: 'cesta',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'Colheita ou manuseio inadequado',
            inappropriateStorage: 'Armazenamento inadequado / falta de armazenamento adequado',
            overproduction: 'Sobreprodução',
            transportationDamage: 'Danos durante o transporte',
            pest: 'Pragas',
            diseases: 'Doenças',
            weather: 'Condições climáticas extremas',
            price: 'Preços de mercado muito baixos',
            other: 'Outro',
          },
          errorMessages: {
            number: 'Deve ser um número positivo e não nulo',
            reasonsForSpoilage: 'Por favor, introduza pelo menos uma razão.',
            totalMismatch:
              'A soma de Consumido, Vendido e Perdido ou vendido abaixo do preço de mercado deve ser igual à quantidade total produzida.',
            cropError: 'Por favor, selecione um produto',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'Selecione as paletes que deseja remover',
        selectAll: 'Selecione Todos',
        checkIn: 'Check-in',
        days: 'dias',
        day: 'dia',
        ttp: 'TTP',
        numberOfCrates: 'Número de paletes',
        totalWeight: 'Peso Total',
        priceType: 'Tipo de preço',
        crate: 'palete',
        pricePerProduct: 'Preço por produto:',
        calculatedPrice: 'Preço calculado',
        discount: 'Desconto',
        priceWithDiscount: 'Preço total',
        paymentType: {
          label: 'Tipo de pagamento',
          cash: 'Dinheiro',
          creditCard: 'Cartão de Crédito',
        },
        paid: 'Pago',
      },
      CheckIn: {
        emptyState: 'Nenhuma caixa adicionada ainda',
        addCrates: 'Adicionar Paletes',
        checkInWithCode: 'Check-in com código',
        estimatedCost: 'Custo estimado',
        pricing: 'Preços',
        day: 'dia',
        successMessage: 'As paletes foram registadas com sucesso',
        emptyMessage: 'Por favor, adicione pelo menos uma palete ao seu check-in',
        noPlannedDaysMessage:
          'Faltam dias planeados em alguns itens. Não é possível calcular o custo estimado.',
        WithCode: {
          modalTitle: 'Criar Check-in a partir de Check-out existente',
          modalDescription:
            'Você precisará do código de check-out para iniciar um novo check-in desta forma. Se não o tiver, considere iniciar um novo check-in. Se souber por quanto tempo planeia armazenar, considere adicionar o número de dias aqui.',
          codeLabel: 'Adicionar código',
          codeErrorMessage: 'Código é obrigatório',
        },
        SelectCropType: {
          fruits: 'Frutas',
          vegetables: 'Legumes',
          rootVegetables: 'Legumes de raiz',
          other: 'Outros Itens',
        },
        SelectCrop: {
          additionalInfo: 'Info adicional',
        },
        Setup: {
          selectedCrop: 'Produto selecionado',
          changeCropButton: 'Clique aqui para mudar o produto',
          individualCrateWeightButton: 'Clique aqui para editar o peso individual da palete',
          individualCrateIdButton: 'Clique aqui para editar os IDs individuais das paletes',
          numberOfCratesLabel: 'Número de paletes',
          crateWeightLabel: 'Peso geral da palete',
          pricePerDayLabel: 'Preço por dia / palete',
          fixedPriceLabel: 'Preço fixo',
          totalPriceLabel: 'Preço total',
          plannedDaysLabel: 'Número planeado de dias em armazenamento',
          harvestDateLabel: 'Quando foi colhida a colheita?',
          harvestDateValues: {
            today: 'Hoje',
            yesterday: 'Ontem',
            dayBefore: 'Há dois dias',
            evenBefore: 'Ainda antes',
          },
          cratesError: 'Por favor, insira um número positivo de paletes',
          crateWeightError: 'Por favor, insira um peso positivo para a palete',
          harvestDateError: 'Data da colheita é obrigatória',
          modals: {
            weight: 'Definir Peso Individual das Paletes',
            id: 'Definir ID Individual das Paletes',
            crateLabel: 'Palete',
            selectInitialId: 'Por favor, defina o ID inicial da palete',
            serialize: 'Serializar',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: {
        label: 'Unidade de refrigeração: {{name}}',
        header: 'Selecione uma unidade de refrigeração',
      },
      occupancy: 'Ocupação atual da unidade de refrigeração',
      week: 'Esta semana',
      today: 'Hoje',
    },
    CoolingUnitsRoomConditions: {
      heading: 'Histórico de temperatura',
      temperature: 'Temperatura',
      lastUpdated: 'Última atualização às {{date}}',
      enterTemperature: 'Introduzir temperatura',
      toasts: {
        confirmation: 'Temperatura modificada corretamente',
      },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'Produto',
      percentage: 'Percentagem',
      weight: 'Peso',
      crates: 'Paletes',
      optimalTemp: 'Temp. Óptima °C',
      messages: {
        empty:
          'A ocupação e a temperatura das unidades de refrigeração aparecerão aqui quando você realizar pelo menos um check-in em qualquer sala.',
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'Sala de produto único: {{crop}}',
      multiCommodity: 'Sala de múltiplos produtos',
      publicMaker: 'Unidade de refrigeração pública',
      usedMarker: 'Unidade de refrigeração que você já usou',
    },
    Company: {
      SelectCompany: {
        label: 'Empresa: {{name}}',
        header: 'Selecione uma empresa',
      },
    },
    ProduceDetails: {
      seeDetails: 'Ver detalhes',
      kilogram: 'kg',
      coolingUser: 'Utilizador de Refrigeração',
      contact: 'Contacto',
      contactCopied: 'Copiado!',
      crates: 'paletes',
      crate: 'palete',
      cropType: 'Tipo de produto',
      numberOfCrates: 'Número de paletes',
      crateIds: 'IDs das paletes',
      combinedWeight: 'Peso combinado',
      remainingTime: 'Tempo restante para recolha',
      currentStorageDays: 'Dias atuais de armazenamento',
      plannedDays: 'Dias planeados',
      pricePerDay: 'Preço / dia',
      plannedStorageCost: 'Custos de armazenamento planeados',
      pickUp: 'Recolha dentro de',
      days: 'Dias',
      noDTMessage: 'Um modelo de validade não está disponível para este produto específico.',
      checkOutButton: 'Check-out',
    },
    SearchFilter: {
      detailsMessage:
        'Procure um check-in usando tipo de produto, nome do agricultor, dias em armazenamento, dias restantes em armazenamento ou código de check-in',
      idMessage:
        'Procure uma palete usando o número de ID da palete utilizado para identificar uma palete específica',
      crateDetailsButton: 'Pesquisar Detalhes da Palete',
      crateIdButton: 'Pesquisar ID da Palete',
      searchLabel: 'Pesquisar',
    },
    SortMenu: {
      title: 'Ordenar por',
      options: {
        cropType: 'Tipo de produto',
        timeToPick: 'Tempo até recolha',
        checkInDate: 'Data de check-in (primeiro para último)',
        checkInDateReverse: 'Data de check-in (último para primeiro)',
        coolingUser: 'Nome do utilizador de refrigeração',
      },
    },
    Management: {
      Location: {
        text: {
          invited: 'Convidados ({{amount}})',
          registered: 'Registados ({{amount}})',
        },
        chips: {
          address: 'Morada',
          coordinates: 'Coordenadas',
          geolocation: 'Geolocalização do Telefone',
        },
        fields: {
          name: 'Nome',
          latitude: 'Latitude',
          longitude: 'Longitude',
          country: 'País',
          state: 'Estado',
          city: 'Cidade',
          zipCode: 'Código Postal',
          street: 'Rua',
          streetNumber: 'Número da Rua',
        },
        modal: {
          message:
            'Esta operação irá eliminar todas as unidades de refrigeração associadas a esta localização. Deseja continuar?',
        },
        actions: {
          currentLocation: 'Escolher localização atual',
        },
        toasts: {
          addLocationSuccess: 'Localização adicionada com sucesso',
          editLocationSuccess: 'Localização editada com sucesso',
          removeLocationSuccess: 'Localização {{name}} foi eliminada com sucesso.',
        },
      },
      Operators: {
        banner:
          'Após adicionar o utilizador, ele receberá um SMS com um link de convite, onde poderá ativar a sua conta.',
        text: {
          gender: 'Género',
          ma: 'Masculino',
          fe: 'Feminino',
          ot: 'Outro',
        },
        fields: {
          selectCoolingUnit: 'Selecione uma unidade de refrigeração',
          coolingUnits: 'Unidade(s) de refrigeração',
        },
        actions: {
          invite: 'Convidar',
          save: 'Guardar alterações',
        },
      },
      AddOperator: {
        messages: {
          operator: 'Para se juntar ao aplicativo Coldtivate como Operador, vá para: {{link}}',
        },
        toasts: {
          error: 'Telefone já atribuído. Tente outro',
          success: 'Operador convidado com sucesso',
        },
        phoneFormat: 'Certifique-se de que o número de telefone inserido tem um código de país.',
      },
      EditOperator: {
        toasts: {
          success: 'Operador editado com sucesso',
        },
      },
      AddCoolingUser: {
        toasts: {
          add: 'Adicionar Utilizador de Refrigeração',
        },
      },
      CompanyDetails: {
        labels: {
          name: 'Nome',
          uploadLogo: 'Carregar Logotipo',
          country: 'País',
          commodity: 'Lista de Produtos',
          currency: 'Moeda',
        },
        headings: {
          country: 'Selecione um país',
          commodity: 'Selecione um produto',
          currency: 'Selecione uma moeda',
        },
        actions: {
          save: 'Guardar Alterações',
        },
        toasts: {
          success: 'Editado com sucesso',
        },
      },
      RegisteredEmployee: {
        invited: 'Convidados ({{amount}})',
        registered: 'Registados ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'Para eliminar a sua conta, vá para Detalhes da Conta.',
        deleteOther: 'Se deseja eliminar esta conta, por favor contacte {{contact}}',
      },
      AddRegisteredEmployee: {
        message:
          'Para se juntar ao aplicativo Coldtivate como um Funcionário Registado, vá para: {{link}}',
        toasts: {
          success: 'Funcionário registado convidado com sucesso',
        },
      },
      CoolingUsers: {
        modals: {
          selectMethod: 'Como deseja adicionar o utilizador?',
          userCode: 'Introduza um código de utilizador',
          userCodeDesc:
            'Você pode encontrar o código nos detalhes da sua conta se se registou como utilizador de refrigeração.',
          addByCode: 'Adicionar utilizador por código',
          addWithDetails: 'Adicionar utilizador com detalhes',
        },
        toasts: {
          notFound: 'Nenhum utilizador de refrigeração com este código foi encontrado.',
          taken: 'Este utilizador já está na sua lista de utilizadores de refrigeração.',
        },
      },
      EditCoolingUsers: {
        toasts: {
          warning:
            'Esta conta não pode ser eliminada porque o utilizador tem check-ins ativos na(s) unidade(s) de refrigeração {{names}}. Por favor, notifique o utilizador para vir à sala para recolher estes itens e concluir os check-outs antes de eliminar a conta!',
          confirmation:
            'Tem a certeza de que deseja eliminar este utilizador da sua lista de utilizadores de refrigeração? Esta operação irá eliminar este utilizador e não poderá ser revertida!',
          edit: 'Utilizador de refrigeração editado com sucesso',
          noCoolingUnits: 'Você ainda não tem nenhuma unidade de refrigeração',
          updateSuccess: 'Atualização bem-sucedida',
        },
        pdf: {
          dateRange: 'Intervalo de datas',
          selectedUnits: 'Unidades de refrigeração selecionadas',
          coolingUnit: 'Unidade de refrigeração',
        },
        actions: {
          downloadFarmers: 'Descarregar dados do painel dos agricultores',
          completeLater: 'Completar mais tarde',
        },
      },
      AddCoolingUnit: {
        heading: 'Propriedades da unidade de refrigeração',
        fields: {
          name: 'ID da unidade de refrigeração',
          location: 'Localização',
          coolingUnitType: 'Como descreve melhor a unidade de refrigeração?',
          metricUnit: 'Unidade',
          price: 'Preço',
          capacityInMetricTons: 'Volume total vazio',
          foodCapacityInMetricTons: 'Volume máximo de alimentos',
          roomSizeHeading: 'Tamanho da unidade de refrigeração',
          length: 'Comprimento',
          width: 'Largura',
          height: 'Altura',
          weight: 'Peso',
          roomInsulator: 'Isolamento',
          capacityInNumberCrates: 'Número máximo de paletes',
          crateWeight: 'Peso padrão de uma palete',
          crateSizeHeading: 'Dimensões de uma palete padrão',
          editableCheckins: 'Tornar os check-ins editáveis pelos operadores',
          sensorAvailable: 'Sensor disponível',
          public:
            'Deseja tornar a sua unidade de refrigeração visível para potenciais utilizadores (informações de localização, tipo de sala, capacidade e preço)?',
          crops: 'Comodidades',
          selectCrops: 'Selecione comodidades',
          refrigerantType: 'Tipo de refrigerante utilizado',
          amountRefrigerant: 'Quantidade de refrigerante',
          powerConsumptionInMt: 'Consumo de energia da unidade de refrigeração por MT',
          dailyRoomWattage: 'Consumo diário de energia da sala',
          powerSource: 'Como é alimentada a unidade de refrigeração?',
          powerSourceDieselConsumptionKwh: 'Consumo de diesel do gerador por kWh',
          pvPanelType: 'Tipo de painéis solares',
          pvPanelCount: 'Número de painéis solares',
          pvPanelSize: 'Tamanho de um painel solar',
          pvPanelWeight: 'Peso de um painel solar',
          pvPanelMaxPower: 'Potência máxima de um painel solar',
          powerSourceDieselPercent: 'Gerador a diesel',
          powerSourceGridPercent: 'Rede elétrica',
          powerSourcePvPercent: 'Painéis solares',
          powerSourceBiomassPercent: 'Biomassa',
          electricityStorageSystem: 'Sistema de armazenamento de eletricidade',
          thermalStorageMethod: 'Método de armazenamento térmico',
          batteryCount: 'Número de baterias',
          batteryWeight: 'Tamanho da bateria',
          batteryCapacity: 'Capacidade de uma bateria',
          batteryMaxCurrent: 'Corrente máxima de carga de uma bateria',
          batteryPeakEnergyStorage: 'Armazenamento de energia no nível máximo de uma bateria',
          batteryType: 'Tipo de baterias',
          selectSensorType: 'Selecione tipo de sensor',
          addTempSensor: 'Adicionar um sensor de temperatura à sua unidade de refrigeração.',
          sensorDesc: {
            default: 'Solicite esta informação ao seu fornecedor de sensores se não a tiver.',
            ubibot: 'Encontre estas informações na sua conta Ubibot.',
          },
          ecozen: {
            username: 'Nome de utilizador',
            password: 'Palavra-passe',
            machineId: 'ID da máquina',
          },
          ubibot: {
            accountKey: 'Chave de conta',
            channelId: 'ID do canal',
            sensorFieldTitle: 'Selecione o seu campo de sensor',
            sensorFieldDesc: 'Selecione o seu campo de sensor',
            field: 'Campo',
          },
          figorr: {
            apiKey: 'Chave API',
            deviceTag: 'Etiqueta do dispositivo',
          },
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: 'É uma sala de armazenamento colocada no portão da quinta',
          MARKET_STORAGE_ROOM: 'É uma sala de armazenamento colocada no mercado',
          MOVABLE_UNIT: 'É uma unidade móvel (por exemplo, um caminhão refrigerado)',
          OTHER: 'Outro',
        },
        pricing: {
          label: 'Tipo de preço',
          PERIODICITY: 'Por dia',
          FIXED: 'Fixo',
          day: 'dia',
        },
        metricUnit: {
          label: 'Unidade',
          KILOGRAMS: 'kg',
          CRATES: 'Palete',
        },
        toasts: {
          addSuccess: 'Unidade de refrigeração adicionada com sucesso',
          integrationError:
            'Não foi possível conectar ao sensor. Valide os seus dados ou contacte o seu fornecedor de sensores.',
          integrationSuccess: 'Credenciais do sensor autenticadas com sucesso.',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            'Esta operação irá apagar esta unidade de refrigeração, incluindo o seu histórico. Deseja continuar?',
        },
        buttons: {
          viewExisting: 'Ver existente',
          editPricing: 'Editar preços',
        },
        toasts: {
          editSuccess: 'Unidade de refrigeração editada com sucesso',
          cantDelete:
            'Não é possível apagar esta unidade de refrigeração porque tem check-ins ativos.',
          successDelete: 'A unidade de refrigeração {{name}} foi apagada com sucesso.',
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'Selecione dias:',
        empty:
          'Os check-ins e check-outs aparecerão no painel quando você fizer pelo menos um check-in em qualquer sala.',
        downloadDataButton: 'Baixar dados',
        modal: {
          title: 'Definir configuração',
          coolingUnitSelection: 'Selecione unidade de refrigeração:',
        },
        summary: {
          totalCheckIns: 'Número total de check-ins:',
          totalCrates: 'Número total de paletes:',
          totalWeight: 'Peso total:',
          totalUsers: 'Número total de utilizadores distintos:',
          weightUnit: 'kg',
        },
      },
      RevenueAnalysis: {
        summary: {
          total: 'Receita total',
        },
        paymentType: {
          label: 'Selecione métodos de pagamento:',
          cash: 'Dinheiro',
          creditCard: 'Cartão de Crédito',
        },
      },
    },
    AccountDetails: {
      popups: {
        default: 'Tem a certeza de que deseja apagar a sua conta?',
        lastRegisteredEmployee:
          'Você é o único Funcionário Registrado na empresa; esta ação irá apagar a empresa!',
        activeCheckInOP:
          'A(s) unidade(s) de refrigeração {{names}} a que está atribuído tem check-ins ativos e você é o último operador. Precisa de verificar todos os produtos ou notificar um Funcionário Registrado para atribuir um operador diferente a esta unidade de refrigeração antes de poder apagar a sua conta!',
        activeCheckInRE:
          'Não pode apagar a sua conta se for o último Funcionário Registrado e houver check-ins ativos em algumas unidades de refrigeração, pois esta ação apagará a sua empresa. Certifique-se de que todos os check-ins ativos nas unidades de refrigeração {{names}} estão verificados primeiro.',
        activeCheckInCU:
          'Não pode apagar a sua conta porque tem check-ins ativos nas unidades de refrigeração {{names}}. Por favor, verifique esses itens primeiro e, em seguida, tente novamente apagar a sua conta!',
      },
      fields: {
        location: 'Localização',
        userCode: 'Código de Importação do Utilizador de Refrigeração',
      },
      toasts: {
        success: 'Utilizador atualizado com sucesso',
      },
    },
    About: {
      runtimeAgree: 'Acordo de Execução Comsol',
      userLicense: 'Acordo de Licença do Utilizador Final',
      privacyPolicy: 'Política de Privacidade',
      comsolAbout: 'Sobre a Comsol',
    },
    KnowledgeHub: {
      comic: 'A jornada do agricultor: Banda Desenhada',
      cooling: 'O que é Cooling-as-a-Service?',
      quality: 'Como maximizar a qualidade das colheitas',
      optimal: 'Condições ideais de armazenamento em salas frigoríficas multi-commodities',
      table: 'Tabela de armazenamento de colheitas',
      sensors: 'Sensores de temperatura e modelo Time-to-Pick-Up',
      tips: 'Dicas para verificar paletes',
      glitches: 'Como responder a falhas técnicas na sala frigorífica',
      source: 'Fonte: consulte o Manual dos Operadores para mais informações:',
      clickHere: 'Clique aqui',
    },
    History: {
      priceLabel: 'Preço',
      empty:
        'Os check-ins e check-outs aparecerão no painel quando você realizar pelo menos um check-in em qualquer sala.',
      sortMenuOptions: {
        cropType: 'Tipo de produto',
        movementDate: 'Data de movimentação (primeiro para mais recente)',
        movementDateReverse: 'Data de movimentação (mais recente para primeiro)',
        checkInFirst: 'Check-in primeiro',
        checkOutFirst: 'Check-out primeiro',
        coolingUser: 'Nome do utilizador de refrigeração',
      },
      optionsMenu: {
        common: {
          pdfReceipt: 'Descarregar recibo PDF',
        },
        checkOut: {
          seeDetails: 'Ver detalhes',
          smsReceipt: 'Descarregar recibo SMS',
          marketSurvey: 'Preencher inquérito de mercado',
        },
        checkIn: {
          edit: 'Editar check-in',
        },
      },
      detailsModal: {
        operatorNameLabel: 'Nome do operador de check-out',
        operatorNumberLabel: 'Número do operador de check-out',
        checkOutDateLabel: 'Data de Check-Out',
        marketSurveyLabel: 'Inquérito de mercado preenchido',
        cratesLabel: 'Paletes',
        combinedWeightLabel: 'Peso combinado',
        paymentMethodLabel: 'Método de pagamento',
        cropTypeLabel: 'Tipo de produto',
        checkInCodeLabel: 'Código de Check-In',
        crateIdsLabel: 'IDs das paletes',
      },
      pdfModal: {
        coolingUserLabel: 'Utilizador de Refrigeração',
        dateLabel: 'Data',
        weightLabel: 'Peso (Kg)',
        downloadButton: 'Descarregar Fatura',
        downloadName: '{{code}}-recibo',
        successMessage: 'Recibo descarregado!',
        errorMessage: 'Algo deu errado. Por favor, tente novamente mais tarde.',
        checkOut: {
          title: 'Empresa',
          checkOutLabel: 'Código de Check-out',
          idLabel: 'ID',
          itemLabel: 'Item',
          calculatedPriceLabel: 'Preço calculado',
          discountLabel: 'Desconto',
          totalPrice: 'Preço total',
        },
        checkIn: {
          title: 'Recibo de Check-in',
          operatorLabel: 'Operador',
          codeLabel: 'Código de Check-in',
          companyLabel: 'Empresa',
          coolingUnitLabel: 'Unidade de Refrigeração',
          priceLabel: 'Preço {{currency}} / Dia',
          cropLabel: 'Produto',
          numberOfCratesLabel: 'Número de Paletes',
          totalLabel: 'Total',
        },
      },
      editCheckIn: {
        contactLabel: 'Contacto',
        coolingUserLabel: 'Utilizador de Refrigeração',
        disclaimer: 'Aviso: O tempo para recolha é uma estimativa do número de dias.',
        disclaimerMessage:
          'Aviso. Note que o tempo para recolha é uma estimativa do número de dias. Esta estimativa foi baseada em modelos calibrados para as espécies de frutas ou vegetais e uma simulação numérica. A degradação real da qualidade do produto, no entanto, também depende das condições meteorológicas locais, condições de cultivo, data de colheita e outros fatores. Portanto, podem ocorrer desvios em relação ao tempo previsto para os dias de recolha.',
        selectCropLabel: 'Selecione um produto',
        successMessage: 'Check-in atualizado com sucesso!',
        errorMessage: 'Falha ao atualizar o check-in. Por favor, tente novamente.',
      },
      survey: {
        fillMessage: 'Por favor, preencha o inquérito base para {{crop}}!',
        baseSurvey: {
          occupationQuestion: 'O que melhor define você?',
          occupationFarmer: 'Um agricultor',
          occupationTrader: 'Um pequeno vendedor/comerciante/atacadista',
          usageQuestion: 'Você já usou a sala fria no passado?',
          newUser: 'Não, sou um novo usuário',
          oldUser: 'Sim, já usei a sala fria',
          mostUsedCommoditiesQuestion: 'Quais são os produtos mais colhidos/comercializados?',
          commodity: 'Produto',
          newCommodity: 'Produto {{index}}',
          fillCommoditiesMessage:
            'Por favor, preencha as perguntas abaixo para os produtos que você planeja trazer para a sala com mais frequência.',
          addCommodityButton: 'Adicionar produto',
          genericFormError: 'Por favor, selecione uma opção',
          experienceError: 'Por favor, introduza um valor',
        },
        marketSurvey: {
          title:
            'Por favor, responda às seguintes perguntas sobre as paletes de {{crop}} que você fez check-out.',
          locationQuestion: 'Onde você vendeu sua produção?',
          locations: {
            farm: 'Na propriedade',
            market: 'Mercado local',
            both: 'Tanto na propriedade quanto no mercado',
          },
          priceQuestion: 'Qual foi o preço que você recebeu por isso?',
          spoiledProducesQuestion:
            'Quanto do que estava armazenado na semana passada foi estragado ou vendido abaixo do preço médio de mercado?',
          spoilageReasonsQuestion: 'Qual é a principal razão para o estrago da colheita?',
          formError: 'Por favor, selecione uma opção',
        },
      },
      stringTemplates: {
        sendSMS: `{{companyName}} - Recibo de {{movementType}}:
          Código de movimentação: {{code}}
          Produtos: {{crops}}
          Peso total: {{weight}} Kg
          {{movementTypeForDate}}: {{date}}
          Preço: {{price}}
          Pago por: {{farmersName}}
          `,
        movementType: {
          checkOut: 'Check-Out',
          checkIn: 'Check-In',
          checkedOut: 'Check-out realizado',
          checkedIn: 'Check-in realizado',
        },
      },
    },
    Analytics: {
      company: 'Empresa',
      aggregated: 'Agregado',
      comparison: 'Comparação',
      downloadDataButton: 'Descarregar dados',
      users: 'Utilizadores',
      impact: 'Impacto',
      maleLabel: '👨🏽 Masculino: {{amount}}',
      femaleLabel: '👩🏽 Feminino: {{amount}}',
      otherLabel: 'Outro: {{amount}}',
      usersTotal: 'Número total de utilizadores de refrigeração distintos = {{amount}}',
      operatorsTotal: 'Número total de operadores = {{amount}}',
      beneficiariesTotal: 'Número total de beneficiários indiretos = {{amount}}',
      totalCratesLabel: '🧺 Total de paletes',
      totalQuantityLabel: '📦 Quantidade total (kg)',
      totalOperations: '👷🏽‍♂️ Total de operações',
      checkedInLabel: 'Check-ins: {{amount}}',
      checkedOutLabel: 'Check-outs: {{amount}}',
      methodologyButton: 'Ver Metodologia',
      farmersAnalytics: {
        coolingUserName: 'Nome do Utilizador de Refrigeração',
        coolingUserType: 'Tipo de Utilizador de Refrigeração',
        avgStorageTime: 'Tempo Médio de Armazenamento',
        coldStorageCost: 'Custo de Armazenamento Frio',
        days: 'dia(s)',
        baselineSurveyButton: 'Preencher Inquéritos Base',
        baseLineSurveyMessage: 'Você tem {{amount}} inquéritos para completar 😟',
        postCheckOutSurveyButton: 'Preencher Inquéritos Pós-Check-Out',
        postCheckOutSurveyMessage: 'Você tem {{amount}} inquéritos para completar 😟',
        noChangeFoodLoss: 'Sem alteração na perda de alimentos',
        increaseInFoodLoss: 'Aumento na perda de alimentos',
        decreaseInFoodLoss: 'Diminuição na perda de alimentos',
        increaseInRevenue: 'Aumento na receita',
        decreaseInRevenue: 'Diminuição na receita',
        foodLossEvolution: '🥗 Evolução da perda de alimentos por produto (top 5)',
        changePercentage: '% Alteração',
        crops: 'Produtos',
        foodLossLevels: 'Níveis de perda de alimentos',
        revenueEvolution: '💰 Evolução da receita média',
        revenueCropEvolution: '💰 Evolução da receita média por produto (top 5)',
        noChangeRevenue: 'Sem alteração na receita',
        revenueLevels: 'Níveis de receita',
        baselineSurveyLabel: '📊 Nº de inquéritos base preenchidos',
        postCheckoutSurveyLabel: '📊 Nº de inquéritos pós-checkout preenchidos',
      },
      companyTab: {
        usersTab: {
          employeesTotal: 'Número total de funcionários registados = {{amount}}',
          usersType: 'Tipo de utilizadores de refrigeração',
          farmersLabel: '🧑🏽‍🌾 Agricultores: {{amount}}',
          tradersLabel: '👩🏽‍💼 Comerciantes: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'Ocupação média das unidades de refrigeração:',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: '🥗 Evolução da perda de alimentos',
          revenueLabel: '💰 Evolução da receita dos utilizadores de refrigeração',
          co2Label: '💨 Evolução das emissões de CO2e',
          surveysAmountLabel:
            '📊 Nº de inquéritos usados para calcular a perda de alimentos e evolução da receita',
          co2Increase: 'Emissões de CO2e por kg de produto aumentaram com refrigeração',
          co2Decrease: 'Emissões de CO2e por kg de produto diminuíram com refrigeração',
          co2WithoutCooling: 'Kg de CO2e por kg de produto emitido sem refrigeração',
          co2WithCooling: 'Kg de CO2e por kg de produto emitido com refrigeração',
          from: 'De',
          to: 'Até',
        },
        downloadFileName: 'dados-analiticos',
        utilization: 'Utilização',
        goBackButton: 'Voltar ao principal',
        companyNameLabel: 'Nome da Empresa',
        revenueLabel: 'Receita Total',
        coolingUnitsLabel: 'Nº de Unidades de Refrigeração',
        singleCoolingUnitContent: '1 unidade',
        coolingUnitsContent: '{{amount}} unidades',
        capacityLabel: 'Capacidade total de refrigeração',
        capacityContent: '{{amount}} toneladas métricas',
        coolingUnitTypeLabel: 'Tipo de unidade de refrigeração',
        coolingUnitTypeMarket: '{{amount}} salas de mercado',
        coolingUnitTypeFarmGate: '{{amount}} salas na propriedade',
        coolingUnitTypeMovable: '{{amount}} salas móveis',
      },
      tabsShared: {
        configurationMessage:
          'Por favor, configure suas datas e unidades de refrigeração para ter acesso',
        configureButton: 'Configurar',
        crates: 'Paletes',
        dateRangeLabel: 'Intervalo de datas:',
        selectedUnitsLabel: 'Unidades de refrigeração selecionadas:',
        totalCo2Label: '💨 Total de CO2e emitido:',
        roomRevenue: '📈 Receita da sala',
      },
      comparisonTab: {
        sortingLabel: 'Ordenar',
        coolingUnit: 'Unidade de Refrigeração',
        genderHeader: 'Masculino | Feminino | Outro',
        genderSecondaryHeader: 'Masculino | Feminino',
        total: 'total',
        sortingMenuOptions: {
          descending: 'Decrescente',
          ascending: 'Crescente',
          coolingUnitName: 'Nome da Unidade de Refrigeração',
        },
        usersTab: {
          operators: 'Operadores',
          users: 'Utilizadores ativos de refrigeração',
          activeUsers: 'Utilizadores ativos',
          beneficiaries: 'Beneficiários indiretos',
        },
        cratesTab: {
          crates: 'Paletes',
          kg: 'Kg',
          operations: 'Operações',
          checkedIn: 'Check-ins',
          checkedOut: 'Check-outs',
          checkedInCropDistribution: '🧺 Distribuição de produtos no check-in (paletes)',
          checkedInKgDistribution: '⚖️ Distribuição de produtos no check-in (kg)',
          checkInCropDistribution: 'Distribuição de produtos no check-in',
          checkedOutCropDistribution: '🧺 Distribuição de produtos no check-out (paletes)',
          checkedOutKgDistribution: '⚖️ Distribuição de produtos no check-out (kg)',
          checkOutCropDistribution: 'Distribuição de produtos no check-out',
          co2: '💨 CO2e emitido para refrigeração',
          co2EmissionsLabel: 'Emissões de CO2e (kg)',
          co2DistributionLabel: 'Distribuição de CO2e por produto',
        },
        impactTab: {
          occupancyLabel: '🏘️ Ocupação média das unidades de refrigeração',
          occupancy: 'Ocupação',
          foodLossLabel: '🥗 Evolução da perda de alimentos',
          revenueLabel: '💰 Evolução da receita dos utilizadores de refrigeração',
          changePercentage: '% Alteração',
          completePercentage: '% Completo',
          foodLossLevels: 'Níveis de perda de alimentos',
          revenueLevels: 'Níveis de receita',
          revenuePerRoomLabel: '📈 Receita por sala',
          co2Label: '💨 Evolução das emissões de CO2e',
          surveysAmountLabel:
            '📊 Nº de inquéritos usados para calcular a perda de alimentos e evolução da receita',
          co2EmissionsLabel: 'CO2e (kg)',
        },
      },
    },
    Notifications: {
      text: {
        notifications: 'Notificações',
      },
      sensorError:
        'O sensor da sala fria {{unitName}} não enviou dados nas últimas 12 horas. Por favor, insira os dados manualmente até que o problema seja resolvido.',
      survey:
        'Por favor, preencha o inquérito de mercado para {{farmer}}, referente à movimentação {{movementCode}}.',
      link: 'Por favor, acesse aqui para completá-lo.',
      coolingUserSurvey:
        'Você fez check-in de {{crop}}, mas não completou o inquérito para este produto.',
      operatorSurvey:
        'Você fez check-in de {{crop}} para {{farmer}}, mas não completou o inquérito para este produto.',
      pickup:
        'Suas paletes de {{crop}} devem ser recolhidas o mais rápido possível! (data do check-in: {{checkIn}}, ID da unidade de refrigeração: {{unitId}}, ID do check-in: {{movementCode}}).',
      notifyCoolingUser:
        'Por favor, notifique o usuário {{farmer}} que suas paletes de {{crop}} devem ser recolhidas o mais rápido possível! (data do check-in: {{checkIn}}, ID da unidade de refrigeração: {{unitId}}, ID do check-in: {{movementCode}}).',
      checkIn: 'O operador {{farmer}} editou o check-in {{movementCode}} em {{date}}.',
    },
  },
} satisfies Translations;
