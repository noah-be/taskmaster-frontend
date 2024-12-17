<template>
  <v-container class="py-4">
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <p>{{ $t('views.contact.questionMessage') }}</p>
            <br />
            <p>{{ $t('views.contact.reachMessage') }}</p>
            <br />
            <ul class="list-with-padding">
              <li>
                <a href="mailto:noah.frank@code.berlin">{{ $t('views.contact.emailText') }}</a>
              </li>
              <li>
                <a href="https://github.com/noah-frank/" target="_blank">{{ $t('views.contact.githubText') }}</a>
              </li>
            </ul>
            <br />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.list-with-padding {
  padding-left: 1rem;
  list-style-type: disc;
}
</style>
