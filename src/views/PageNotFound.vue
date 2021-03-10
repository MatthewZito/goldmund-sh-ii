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
            <h1 class="display-1">
              Page not found
            </h1>
            <v-card-subtitle class="pl-0">
              Unfortunately, this page does not exist
            </v-card-subtitle>
             <v-img
              src="@/assets/sadmac.jpeg"
            />

            <v-card-actions class="pl-0">
              <BaseButton
                to="/"
                type="submit"
              >
                Back
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
