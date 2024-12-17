<template>
  <v-container class="py-4">
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <p class="mb-4">{{ $t('views.about.personalProject') }}</p>
            <p class="mb-4">
              {{ $t('views.about.backendIntro') }}
              <strong>{{ $t('views.about.nodejs') }}</strong>
              {{ $t('views.about.and') }}
              <strong>{{ $t('views.about.mongodb') }}</strong>
              {{ $t('views.about.integration') }}
              <strong>{{ $t('views.about.jwt') }}</strong>
              {{ $t('views.about.forAuth') }}
              <strong>{{ $t('views.about.monitoring') }}</strong>
              {{ $t('views.about.using') }}
              <strong>{{ $t('views.about.grafana') }}</strong>
              {{ $t('views.about.backendConclusion') }}
              <strong>{{ $t('views.about.vuejs') }}</strong>
              {{ $t('views.about.frontendConclusion') }}
            </p>
            <p class="mb-4">
              {{ $t('views.about.siteEvolution') }}
              {{ $t('views.about.contactIntro') }} <router-link to="/contact">{{ $t('views.about.contactLinkText') }}</router-link
              >.
            </p>
            <p>{{ $t('views.about.thankYou') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
