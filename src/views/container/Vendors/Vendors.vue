<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="indigo"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("vendors.vendors") }}
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <base-material-card
        color="success"
        icon="mdi-email"
        title="Create a Modify Vendor"
        class="px-5 py-3"
      >
        <v-form class="mt-5">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field label="Vendor Name" />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field label="Vendor Code" />
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field label="Vendor Street addres" />
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field label="City" />
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field label="State" />
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field label="Zip Code" />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field label="Point of Contact Name" />
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <v-text-field label="Phone number" />
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field label="Ext." />
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <v-text-field label="Fax" />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field label="Point of Contact Email" />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field label="Slack or Skype" />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field label="Email to Place Orders" />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  :items="items"
                  label="Existing Inventory Items"
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field label="Link to Vendor" />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  :items="items"
                  label="Terms of payments"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-card-actions class="pl-0">
          <v-btn
            color="success"
            min-width="100"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </base-material-card>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({}),
    created () {},
  }
</script>

<style></style>
