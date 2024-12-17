<template>
  <v-container v-show="visible" :aria-hidden="!visible ? 'true' : 'false'">
    <v-card class="pa-4" elevation="2" id="registration-guidelines">
      <v-card-title class="text-h6">{{ $t('components.registrationGuidelines.title') }}</v-card-title>
      <v-card-text>
        <ul class="custom-list">
          <li>
            <strong>{{ $t('components.registrationGuidelines.usernameLabel') }}:</strong>
            <ul>
              <li>{{ $t('components.registrationGuidelines.usernameRequirements[0]') }}</li>
              <li>{{ $t('components.registrationGuidelines.usernameRequirements[1]') }}</li>
            </ul>
          </li>

          <li>
            <strong>{{ $t('components.registrationGuidelines.passwordLabel') }}:</strong>
            <ul>
              <li>{{ $t('components.registrationGuidelines.passwordRequirements[0]') }}</li>
              <li>{{ $t('components.registrationGuidelines.passwordRequirements[1]') }}</li>
              <li>{{ $t('components.registrationGuidelines.passwordRequirements[2]') }}</li>
              <li>{{ $t('components.registrationGuidelines.passwordRequirements[3]') }}</li>
            </ul>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.custom-list {
  list-style-type: disc;
  margin-left: 20px;
}

.custom-list ul {
  list-style-type: circle;
  margin-left: 20px;
}
</style>
