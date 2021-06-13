<template>
  <teleport to="#message">
    <transition-group tag="div" name="a-message" class="a-message-wrapper" :style="style">
      <div
        v-for="item of messages"
        :key="item.cid"
        :class="['a-message', `a-message-${item.type}`]"
      >
        <span>{{ item.text }}</span>
        <AButton type="full-height" @click="removeMessage(item.cid)">
          <AIcon name="times" />
        </AButton>
      </div>
    </transition-group>
  </teleport>
</template>

<script>
import { computed, reactive } from 'vue';

import AButton from '@/components/basic/AButton.vue';
import AIcon from '@/components/AIcon.vue';
import { CID } from '@/utils/cid';
import { findIndex } from '@/utils/lodash';

export default {
  name: 'AMessage',
  components: {
    AButton,
    AIcon,
  },

  setup() {
    // custom message id controller
    const cidm = new CID();

    // messages
    const messages = reactive([]);

    /**
     * @param {string} cid
     * @param {number} timeout
     * @param {string} type
     * @param {string} text
     */
    const pushMessage = (cid, timeout, type, text) => {
      messages.push({ cid, timeout, type, text });
    };

    const shiftMessage = () => {
      const message = messages.shift();
      message.timeout && clearTimeout(message.timeout);
      cidm.remove(message.cid);
    };

    /**
     * @param {{type: 'default'|'error', text: string}}
     */
    const triggerMessage = ({ type = 'default', text = '' }) => {
      const cid = cidm.get();
      const timeout = setTimeout(() => shiftMessage(), 8000);
      pushMessage(cid, timeout, type, text);
    };

    /**
     * @param {string} cid
     */
    const removeMessage = (cid) => {
      const idx = findIndex(messages, ['cid', cid]);
      if (idx >= 0) {
        messages[idx].timeout && clearTimeout(messages[idx].timeout);
        cidm.remove(messages[idx].cid);
        messages.splice(idx, 1);
      }
    };

    // style
    const style = computed(() => {
      if (messages.length > 0) {
        return { display: 'flex', flexDirection: 'column', gap: '1rem', width: '20rem' };
      } else {
        return { display: 'none' };
      }
    });

    return {
      // data
      cidm,
      messages,
      // computed
      style,
      // methods
      triggerMessage,
      removeMessage,
    };
  },
};
</script>

<style lang="scss">
.a-message {
  background-color: var(--color-bg);
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  box-shadow: var(--shadow-info);
  border-radius: $radius;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  z-index: 99;

  & > span {
    flex: 1 1 auto;
  }

  & > .a-button {
    overflow: hidden;
  }

  &-error {
    box-shadow: var(--shadow-error);
  }

  // animation
  transition: all 200ms ease;

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
