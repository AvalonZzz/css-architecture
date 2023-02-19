<template>
  <div class="page">
    <c-layout>
      <c-launch></c-launch>
      <c-header>
        <c-box-skin type="bottom">
          <c-single-center>
            <hamburger-button
              theme="multi-color"
              size="26"
              :fill="['#333', '#2F88FF', '#FFF', '#d0021b']"
              :strokeWidth="2"
              ml15
              mr10
            />
            <c-single-center class="search" mt8 mb8 mr10 bor-base radius4>
              <search
                theme="multi-color"
                size="26"
                :fill="['#333', '#2F88FF', '#FFF', '#d0021b']"
                :strokeWidth="2"
                ml10
                mr5
              />
              <span>睡衣</span>
            </c-single-center>
            <more-two
              theme="multi-color"
              size="26"
              :fill="['#333', '#2F88FF', '#FFF', '#d0021b']"
              :strokeWidth="2"
            />
          </c-single-center>
        </c-box-skin>
      </c-header>
      <c-main>
        <div class="swiper">
          <div
            class="swiper__item"
            v-for="(item, index) in swiperList"
            :key="index"
          >
            <img :src="item['image']" />
          </div>
        </div>
        <c-box-skin>
          <c-row class="nav" pb6>
            <c-col
              class="nav__col"
              v-for="(item, index) in categoryList"
              :key="index"
              pv5
            >
              <c-single-center class="nav__item">
                <img class="nav__img" :src="item['image']" pb5 />
                <span>{{ item['title'] }}</span>
              </c-single-center>
            </c-col>
          </c-row>
        </c-box-skin>
        <!-- 商品列表 -->
        <c-row class="good" gutter="6" pa12 v-if="brandList.length">
          <c-col span="12">
            <router-link
              v-for="(item, index) in brandList[0]['list']"
              :key="index"
              :to="{ path: '/mall/brand-video', query: { id: item['id'] } }"
            >
              <c-box-skin class="good__item" mb12 radius4>
                <img class="good__img" :src="item['image']" />
                <div class="good__box" pv24 ph12>
                  <p class="good__des" mb10 ellipsis2>
                    {{ item['des'] }}
                  </p>
                  <c-avatar
                    class="good__avatar"
                    :url="item['avatarImage']"
                    :text="item['avatarDes']"
                  ></c-avatar>
                </div>
              </c-box-skin>
            </router-link>
          </c-col>
          <c-col span="12">
            <router-link
              v-for="(item, index) in brandList[1]['list']"
              :key="index"
              :to="{ path: '/mall/brand-video', query: { id: item['id'] } }"
            >
              <c-box-skin class="good__item" mb12 radius4>
                <img class="good__img" :src="item['image']" />
                <div class="good__box" pv24 ph12>
                  <p class="good__des" mb10 ellipsis2>
                    {{ item['des'] }}
                  </p>
                  {{ item.avatarDes }}
                  <c-avatar
                    class="good__avatar"
                    :url="item['avatarImage']"
                    :text="item['avatarDes']"
                  ></c-avatar>
                </div>
              </c-box-skin>
            </router-link>
          </c-col>
        </c-row>
      </c-main>
      <c-footer></c-footer>
    </c-layout>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { HamburgerButton, MoreTwo, Search } from '@icon-park/vue-next'
import {
  getRecommendatoryCategorys,
  getBanners,
  getBrandVideos
} from '@/api/mall'
const swiperList = reactive([])
getBanners().then((res) => {
  swiperList.push(...res.data)
})

const categoryList = reactive([])
getRecommendatoryCategorys().then((res) => {
  categoryList.push(...res.data)
})

const brandList = reactive([])
getBrandVideos().then((res) => {
  brandList.push(...res.data)
  console.log(brandList)
})
</script>

<style lang="scss" scoped>
@include b(search) {
  @include dimensions(265px, 30px);
  box-shadow: 0 0 2px #ff5777;
}

@include b(swiper) {
  overflow: auto;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  @include e(item) {
    display: inline-block;
    width: 100%;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }
}

@include b(nav) {
  @include e(col) {
    width: 20%;
  }
  @include e(item) {
    flex-direction: column;
  }
  @include e(img) {
    @include dimensions(50px);
  }
}

@include b(good) {
  @include e(avatar) {
    @include dimensions(25px);
  }
}
</style>
