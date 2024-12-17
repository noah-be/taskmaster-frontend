<template>
  <v-container class="py-4">
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <p class="mb-4">{{ $t('views.about.personalProject') }}</p>
            <p class="mb-4">
              The backend is powered by <strong>Node.js</strong> and <strong>MongoDB</strong>, both of which are already implemented. I have also integrated
              <strong>JWT</strong> for secure user authentication. Moving forward, I will be enhancing the backend further with features like
              <strong>monitoring</strong> using <strong>Grafana</strong>, optimizing for scalability and performance. On the frontend, I am using
              <strong>Vue.js</strong> to create a dynamic, component-based user interface.
            </p>
            <p class="mb-4">
              This site will continue to evolve as I develop my skills and add new features to meet the objectives of both the frontend and backend modules.
              Feel free to explore the features and technologies I've implemented. If you have any questions or just want to say hello, feel free to
              <router-link to="/contact">contact me</router-link>.
            </p>
            <p>{{ $t('views.about.thankYou') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

// TODO: Figure out how to format translatoins without using html tags in translation text
