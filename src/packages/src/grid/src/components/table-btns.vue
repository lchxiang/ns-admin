<template>
  <div v-if="btnList.length" class="clearfix btn_wraps">
    <div class="pull-left">
      <slot name="left">
        <template v-for="(btnItem, btnIndex) in btnList" :key="btnIndex">
          <template v-if="isShowBtn(btnItem) && (!btnItem.position || btnItem.position === 'left')">
            <el-dropdown
              v-if="btnItem.group && btnItem.children && btnItem.children.length"
              v-show="!btnItem.noShow"
              class="table-btn_item"
              :disabled="btnItem.disabled"
              split-button
              :plain="getDefaultVal(btnItem.plain, false)"
              :type="btnItem.type || 'primary'"
              @command="btnItem.click"
            >
              {{ getBtnText(btnItem) }}
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in btnItem.children"
                    :key="item.code"
                    :command="item.code"
                    >{{ getBtnText(item) }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button
              v-else
              :key="`left${btnIndex}`"
              :disabled="btnItem.disabled"
              :icon="btnItem.icon"
              :plain="btnItem.plain"
              :class="`table-btn_item ${btnItem.class || ''}`"
              :type="btnItem.type ? btnItem.type : 'primary'"
              @click="btnItem.click && btnItem.click({ code: btnItem.code })"
              >{{ getBtnText(btnItem) }}
            </el-button>
          </template>
        </template>
      </slot>
    </div>
    <slot name="right">
      <div class="pull-right">
        <template v-for="(btnItem, btnIndex) in btnList">
          <template v-if="btnItem.position === 'right' && isShowBtn(btnItem)">
            <el-dropdown
              v-if="btnItem.group && btnItem.children && btnItem.children.length"
              v-show="!btnItem.noShow"
              :key="`right${btnIndex}`"
              class="table-btn_item"
              split-button
              :type="btnItem.type || 'primary'"
              @command="btnItem.click"
              @click="btnItem.click && btnItem.click({ code: btnItem.code })"
            >
              {{ getBtnText(btnItem) }}
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in btnItem.children"
                    :key="item.code"
                    :command="item.code"
                    >{{ getBtnText(item) }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button
              v-else
              :key="btnIndex"
              :disabled="btnItem.disabled"
              :icon="btnItem.icon"
              :class="`table-btn_item ${btnItem.class || ''}`"
              :type="btnItem.type ? btnItem.type : 'primary'"
              @click="btnItem.click && btnItem.click({ code: btnItem.code })"
              >{{ getBtnText(btnItem) }}
            </el-button>
          </template>
        </template>
      </div>
    </slot>
  </div>
</template>

<script setup>
  import { isFunction } from 'lodash'

  const props = defineProps({
    btnList: {
      type: Array,
      default: () => [],
    },
    permit: Function,
  })

  function isShowBtn({ code, text, show, icon }) {
    let isShow = show ?? true
    if (isFunction(show)) {
      isShow = show(code)
    }
    if (props.permit && isFunction(props.permit)) {
      return isShow && ((code && props.permit(code)) || !code)
    } else {
      return isShow && (text || icon)
    }
  }

  function getBtnText({ code, text, alias = '' }) {
    let btnText = text
    let aliasText = ''
    if (isFunction(alias)) {
      aliasText = alias(code)
    } else {
      aliasText = alias || ''
    }
    if (props.permit && isFunction(props.permit)) {
      btnText = aliasText || props.permit(code)
    }
    return btnText
  }
</script>

<style></style>
