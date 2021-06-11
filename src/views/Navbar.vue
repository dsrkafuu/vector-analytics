<template>
  <nav class="navbar">
    <div class="a-container">
      <div class="brand">
        <ARouterLink
          class="item"
          :to="{ name: 'Dashboard', query: curWebsite ? { website: curWebsite } : {} }"
          type="full-height"
        >
          Aofuji Analytics
        </ARouterLink>
      </div>
      <div class="menu">
        <div class="start">
          <template v-if="shareID">
            <span class="item expire">
              <ALoading :loading="!shareWebsite" />
              {{ shareWebsite }}
            </span>
          </template>
          <template v-else>
            <ARouterLink
              class="item"
              :to="{ name: 'Dashboard', query: curWebsite ? { website: curWebsite } : {} }"
              type="full-height"
            >
              Dashboard
            </ARouterLink>
            <ARouterLink
              class="item"
              :to="{ name: 'Realtime', query: curWebsite ? { website: curWebsite } : {} }"
              type="full-height"
            >
              Realtime
            </ARouterLink>
            <ARouterLink class="item" :to="{ name: 'Settings' }" type="full-height">
              Settings
            </ARouterLink>
          </template>
        </div>
        <div class="end">
          <div v-if="showSelectWebsite" class="select">
            <ASelect v-model="curWebsite" :map="websitesMap" />
          </div>
          <div class="ctrl">
            <AButton v-if="showLogout" class="item" type="full-height" @click="handleLogout">
              <AIcon name="sign-out" />
            </AButton>
            <AButton class="item" type="full-height" @click="handleThemeSwitch">
              <AIcon name="adjust" />
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  computed: {
    // should show logout button
    showLogout() {
      if (this.shareID) {
        return false;
      }
      return Boolean(this.$store.state.common.account?._id);
    },
    // should show common website select
    showSelectWebsite() {
      return this.$route.path.startsWith('/realtime') || this.$route.path.startsWith('/dashboard');
    },
    // common website select list
    websitesMap() {
      let data = this.$store.state.common.websites || [];
      const map = {};
      for (let i = 0; i < data.length; i++) {
        map[data[i]._id] = { text: data[i].name };
      }
      return map;
    },
    // value for v-model bind select, sync with vuex
    curWebsite: {
      get() {
        return this.$store.state.common.curWebsite?._id || '';
      },
      set(val) {
        if (val) {
          this.$store.commit('dashboard/xmSetInited', { value: false });
          this.$store.commit('realtime/xmSetInited', { value: false });
          this.$store.commit('common/xmSetCurWebsite', { _id: val });
        }
      },
    },

    // share mode computes
    shareID() {
      return this.$store.state.common.shareID || '';
    },
    shareWebsite() {
      return this.$store.state.common.curWebsite?.name || '';
    },
  },

  methods: {
    /**
     * switch the theme
     */
    async handleThemeSwitch() {
      await this.$store.dispatch('theme/xaSwitchTheme');
    },
    /**
     * logout and go login
     */
    async handleLogout() {
      await this.$store.dispatch('common/xaPostLogout');
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: var(--color-bg);
  height: $navbar-height;
  box-shadow: var(--shadow);

  .a-container {
    display: flex;
    height: $navbar-height;
    line-height: $navbar-height;
  }

  @include responsive(mobile) {
    height: $navbar-height-sm * 3;

    .a-container {
      flex-direction: column;
      height: $navbar-height-sm * 3;
      line-height: $navbar-height-sm;
      align-items: center;
      justify-content: center;
    }
  }
}

.brand {
  flex: 0 0 auto;
  font-size: $font-size-md;
  font-weight: 500;

  .item {
    color: var(--color-font) !important;
  }
}

.menu {
  flex: 1 1 auto;
  display: flex;

  @include responsive(mobile) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.select {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.start {
  flex: 1 1 auto;
  display: flex;
}

.end {
  flex: 0 0 auto;
  display: flex;
  gap: $space-sm;
}

// share mode styles
.expire {
  padding: 0 $space-base;
  position: relative;
  width: 100%;

  .a-loading {
    justify-content: flex-start;
    padding-left: $space-base;
  }
}
</style>
