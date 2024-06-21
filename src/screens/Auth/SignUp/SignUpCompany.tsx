import React from 'react';
import { ScrollView } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
//import { getAllISOCodes } from 'iso-country-currency';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
//import { Select } from '#ui/components/Select';

//const countries = getAllISOCodes().map((code) => code.countryName);

const schema = z.object({
  companyName: z.string(),
  country: z.string(),
});

function SignUpCompany() {
  const {
    control,
    // handleSubmit,
    // watch,
    // clearErrors,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: '',
    },
  });

  return (
    <ScrollView tw="flex-1 h-full">
      <Text tw="mb-4 text-5xl font-bold self-center text-center">Welcome to Coldtivate</Text>
      <Text tw="mb-2 px-4 text-xl font-bold">Sign Up Company</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'Company Name*'}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="companyName"
      />
      {/* <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Select
            variant="lg"
            label="Country"
            isModalOpen={false}
            content={{
              header: 'Language',
              options: countries.map((lang, index) => (
                    <RadioButtonItem
                      key={`${lang}-${index}`}
                      label={lang}
                      value={lang}
                      tw="flex flex-row-reverse ml-[-10]"
                    />
                  )),
              footer: (
                <View tw="flex flex-row items-center justify-end">
                  <Button mode="text" uppercase onPress={cancelLanguageUpdate}>
                    Cancel
                  </Button>
                  <Button mode="text" uppercase onPress={doLanguageUpdate}>
                    OK
                  </Button>
                </View>
              ),
            }}
            onClick={() => null} 
          />
        )}
        name="companyName"
      /> */}
      <Divider tw="w-full bg-gray-700" />
      {/* <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Select
            variant="lg"
            label="Currency*"
            isModalOpen={false}
            content={{
              header: 'Language',
              options: countries.map((lang, index) => (
                    <RadioButtonItem
                      key={`${lang}-${index}`}
                      label={lang}
                      value={lang}
                      tw="flex flex-row-reverse ml-[-10]"
                    />
                  )),
              footer: (
                <View tw="flex flex-row items-center justify-end">
                  <Button mode="text" uppercase onPress={cancelLanguageUpdate}>
                    Cancel
                  </Button>
                  <Button mode="text" uppercase onPress={doLanguageUpdate}>
                    OK
                  </Button>
                </View>
              ),
            }}
            onClick={() => null} 
          />
        )}
        name="companyName"
      /> */}
      <Divider tw="w-full bg-gray-700" />
    </ScrollView>
  );
}

export default withSafeArea(SignUpCompany);
