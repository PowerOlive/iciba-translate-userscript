import Vue from 'vue'
import { defineComponent, reactive, onMounted, watch } from '@vue/composition-api'

import { defaultData, store } from '~/service/store'
import copy from '~/util/copy'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.ICIBA])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'IcibaSettings',
  components: {
    IconRadioGroup,
  },
  setup: () => {
    const state = reactive({
      form: copy(defaultData[PROVIDER.ICIBA]),
      loadingSetting: true,
    })

    const loadSettings = () => {
      state.form = copy(store.config[PROVIDER.ICIBA])
      Vue.nextTick(() => {
        state.loadingSetting = false
      })
    }

    onMounted(() => {
      loadSettings()
    })

    watch(() => state.form, () => {
      if (state.loadingSetting) {
        return
      }

      store.config[PROVIDER.ICIBA] = copy(state.form)
      store.saveConfig()
    }, { deep: true, lazy: true })

    return {
      state,
      iconOptions,
    }
  },
})
