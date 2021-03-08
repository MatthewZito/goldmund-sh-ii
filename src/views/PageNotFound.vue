<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="d-flex justify-center">
          <v-card
            color="transparent"
            flat
          >
            <h1 class="display-1 ml-4">
              Page not found
            </h1>
            <v-card-subtitle>
              Unfortunately, this page does not exist
            </v-card-subtitle>
            <v-card-text>
              Please ensure that the URL you entered is correct,<br />
               or click the button below to return to the landing page
            </v-card-text>
            <v-card-actions>
              <BaseButton to="/" type="save" class="ml-2">
                Home
              </BaseButton>
            </v-card-actions>
          </v-card>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageNotFound'
};
</script>
