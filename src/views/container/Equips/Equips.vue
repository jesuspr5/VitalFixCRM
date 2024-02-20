<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="greenligth"
      icon="mdi-plus-network"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("Equipos") }}
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Buscar"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['id', 'titulo']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            :key="1"
            color="gray"
            fab
            class="px-1 ml-1"
            x-small
            @click="showBlogs(item)"
          >
            <v-icon
              small
              v-text="'mdi-eye'"
            />
          </v-btn>
        </template>
      </v-data-table>

      <div class="text-center" />
    </base-material-card>
  </v-container>
</template>

<script>
import i18n from '@/i18n'
export default {
name : 'Equips.vue',
data: () => ({
  hidden: false,
      idblog: '',
      dialogDelete: false,
      snackbar: false,
      message: '',
      headers: [
        {
          text: i18n.t('contact.name'),
          value: 'names',
        },

        {
          text: i18n.t('contact.email'),
          value: 'email',
        },
        {
          text: i18n.t('contact.message'),
          value: 'message',
        },
        {
          sortable: false,
          text: 'Acciones',
          value: 'actions',
        },
      ],
      items: [],
      search: undefined,

})
}
</script>

<style>

</style>