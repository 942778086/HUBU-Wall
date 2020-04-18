<template>
  <div class="social">
    <Me></Me>
    <div class="dynamics-room">
      <div class="dynamics-item" v-for="(item, index) in dynamics" :key="index">
        <div class="title-room">
          <div class="ava-room" style="height:100%;">
            <image class="ava" :src="item.user_ava" />
          </div>
          <div class="name-room">{{ item.username }}</div>
        </div>
        <div class="content-room">{{ item.article }}</div>
        <div v-if="item.picture.length > 15">
          <div class="single-img-room">
            <image @click="showImg(item.picture)" :src="item.picture" />
          </div>
        </div>
        <div class="mul-img-room" v-else>
          <div class="mul-img" v-for="(imgItem, imgIndex) in item.picture" :key="imgIndex">
            <image
              style="width:100%;height: 100%;"
              :src="imgItem"
              @click="showImg(imgItem, item.picture)"
            />
          </div>
        </div>
        <div class="other">
          <div class="view-room other-item">
            <image
              class="icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2OTE5NzE3ODc2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQzMjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUwNy40MTggODA0LjAzNmMtMzAzLjkwNiAwLTQ5NS40MjItMjE1LjU4NC00OTUuNDIyLTI3Mi43NzIgMC01Ny4xODYgMTkxLjUxNi0zMDkuNTQ4IDQ5NS40MjItMzA5LjU0OHM1MDguNTggMjM1LjY4IDUwOC41OCAzMDkuNTQ4QzEwMTUuOTk4IDYwNS4xMzQgODExLjMyNCA4MDQuMDM2IDUwNy40MTggODA0LjAzNnpNNDkzLjc1IDM4Mi4zNGMtNDQuMzUyIDAtODAuMzA2IDM1LjkwMi04MC4zMDYgODAuMTg4IDAgNDQuMjk0IDM1Ljk1NCA4MC4xOTQgODAuMzA2IDgwLjE5NCA0NC4zNDggMCA4MC4zMDQtMzUuOTAyIDgwLjMwNC04MC4xOTRDNTc0LjA1MiA0MTguMjQyIDUzOC4wOTggMzgyLjM0IDQ5My43NSAzODIuMzR6TTczNC44NzYgMzQyLjE5NmMyOS4zMiAzOC45MjggNDkuMjEyIDc4LjQxIDQ5LjIxMiAxMzAuODM2IDAgMTI4LjY0NC0xMDQuNjAyIDIzMi45MjgtMjMzLjYzNiAyMzIuOTI4LTEyOS4wMyAwLTIzMy42My0xMDQuMjg0LTIzMy42My0yMzIuOTI4IDAtNzkuNDg4IDE1LjczLTEyOC45NjQgNzYuNjk0LTE3MC45OTgtMTkyLjU1OCAyOC42NDQtMzEzLjg5IDE4My4yODItMzEzLjg5IDIyNS41ODQgMCA0Ni4zMTggMTU5LjQ2NiAyMTUuMTE4IDQyNC4zMjIgMjE1LjExOHM0MzguMjY4LTE1NS4yODYgNDM4LjI2OC0yMTUuMTE4Qzk0Mi4yMTYgNDg4LjczNiA4OTYuOTMgNDA3LjIxNCA3MzQuODc2IDM0Mi4xOTZ6IiBwLWlkPSI0MzI5IiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+"
            />
            {{ item.view_count }}
          </div>
          <div
            @click="!item.hadLiked && like(item.id, item.like_count); !item.hadLiked && item.like_count++; if (!item.hadLiked) item.hadLiked = true"
            class="like-room other-item"
          >
            <image
              v-if="!item.hadLiked"
              class="icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2OTE5ODQ2NjM3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU0NDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTgyNi4yMzc4OTEgMTc5LjI3MDk2NmMtMzkuNTQzNjIxLTI3LjY3OTQwOS04NC40NDExODEtNDAuNDcwNzM3LTEyOS4yOTk4NTUtNDAuNDcwNzM3LTY4LjUwMDExNyAwLTEzNi44OTY4OCAyOS43OTk3LTE4Ni4wODIwOTIgODEuODc1NzUyLTQ5LjE3NzAyNi01Mi4wNjg4ODktMTE3LjU5MTE4NS04MS44NzU3NTItMTg2LjA4MzExNi04MS44NzU3NTItNDQuODU4Njc0IDAtODkuNzQ5MDcgMTIuNzgzMTQxLTEyOS4yOTg4MzEgNDAuNDcwNzM3Qzg1LjU5MjQgMjU2LjIyMDUyMiA1OC44Nzg5OTIgNDA3LjY3MTg4NiAxMzUuODIwMzYyIDUxNy41NjE2NjljMCAwIDMwLjI3NDUxNCAzOC40NTE3NTQgNTAuNDEwMTEgNjAuMzg1Mjk5IDE2LjQ5MzY0OSAxNy45ODI1NiAyNDYuOTUxNDE1IDIzOS4yMjAzMzcgMzA5LjEzNzczMyAyOTcuODU5ODc1IDAgMCA3LjM4MjEzMSA3LjA2MTgzNiAxNS41MzM3ODggNy4wNjE4MzYgOC44MDg2MiAwIDE1LjQyNjM0MS03LjA2MTgzNiAxNS40MjYzNDEtNy4wNjE4MzZDNTg4LjUwNzQ4OCA4MTcuMTY3MzA1IDgxOC45ODg3OSA1OTUuOTMwNTUxIDgzNS40ODI0MzkgNTc3Ljk0Njk2OGMyMC4xMzM1NDktMjEuOTMzNTQ1IDUwLjM5OTg3Ny02MC4zODUyOTkgNTAuMzk5ODc3LTYwLjM4NTI5OUM5NjIuODMxODcyIDQwNy42NzE4ODYgOTM2LjEyNjY1IDI1Ni4yMjA1MjIgODI2LjIzNzg5MSAxNzkuMjcwOTY2ek04NDcuMzk5ODYzIDQ4OS4wMTc1NjZjLTQuOTQwNTIyIDYuMjUxMzc4LTMwLjM0MzA3NSAzOC4xODY3MTctNDcuMTk1OTA1IDU2LjU1MDk3LTEzLjg3Mzk4NSAxNS4wNTg5NzQtMjM2LjAxNjM2NSAyMjcuODIzNzc1LTI4MS4yNDEzODIgMjcxLjEyMzk1NGwwIDBjLTEuOTYzNzI1IDIuNTA5MTQ3LTUuMDQyODUzIDMuNzQwMTg0LTguNDgwMTM4IDMuNzQwMTg0LTEuNzA3ODk4IDAtMy40NzcxOTQtMC40OTAxNjQtNS4wOTgxMTEtMS4xOTkzMTUtMzguMTcwMzQ1LTM2LjU0MjI2NC0yNjkuNjE4NjcxLTI1OC4xOTM0NTctMjgzLjg3NTM3Mi0yNzMuNjY0ODIzLTE2Ljg1MDc4My0xOC4zNjQyNTMtNDIuMjQ3MTk2LTUwLjI5MTQwNi00Ny4xOTU5MDUtNTYuNTUwOTctMjkuMzIzODYyLTQyLjQ2NjE4NC00MC41MjQ5NzItOTMuNzY5NjQtMzEuNTYxODMzLTE0NC42MzgxOTEgOS4wNTAxMi01MS4yOTczMTYgMzcuNTIzNjE1LTk2LjAwMDQ0OCA4MC4xOTM0MzctMTI1Ljg3NzkxOSAyOS43MjA5MDUtMjAuODEyMDAxIDY0LjkzNjk2NS0zMS44MTA0OTYgMTAxLjgzMDIyMy0zMS44MTA0OTYgNTUuOTk3MzYyIDAgMTExLjEyOTAwNyAyNC4zNzUxNTQgMTUxLjI2NDA5OSA2Ni44NzEwMTNsMzQuODE3OTkzIDM2Ljg2MTUzNiAzNC44MjAwNC0zNi44NjE1MzZjNDAuMTM0MDY5LTQyLjQ5Njg4MyA5NS4yNjU3MTQtNjYuODcxMDEzIDE1MS4yNjMwNzYtNjYuODcxMDEzIDM2Ljg5MzI1OCAwIDcyLjEwOTMxOCAxMC45OTg0OTUgMTAxLjgzMDIyMyAzMS44MTA0OTYgNDIuNjY4Nzk5IDI5Ljg3NzQ3MSA3MS4xNDMzMTcgNzQuNTgwNjAyIDgwLjE5MzQzNyAxMjUuODc3OTE5Qzg4Ny45MzMwMjEgMzk1LjI0NjkwMyA4NzYuNzI0NzQ5IDQ0Ni41NTEzODIgODQ3LjM5OTg2MyA0ODkuMDE3NTY2eiIgcC1pZD0iNTQ0OSIgZmlsbD0iI2Q4MWUwNiI+PC9wYXRoPjwvc3ZnPg=="
            />
            <image
              v-else
              class="icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg3MTA0MjQyOTI1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwOTggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI4NTUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzQuMzEyNSIgaGVpZ2h0PSIzMiI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzY0LjI1MzY1OSAwQTMyNC44NTc3NTYgMzI0Ljg1Nzc1NiAwIDAgMCA1NDkuNDYzNDE1IDgyLjQxOTUxMiAzMjQuODU3NzU2IDMyNC44NTc3NTYgMCAwIDAgMzM0LjY3MzE3MSAwQzE0OS44NTM2NTkgMCAwIDE1OS44NDM5MDIgMCAzNTcuMTUxMjJhNTUwLjgxMjA5OCA1NTAuODEyMDk4IDAgMCAwIDc0LjkyNjgyOSAyNzIuMjM0MTQ2IDg0Ny42OTcxNzEgODQ3LjY5NzE3MSAwIDAgMCAxNjQuODM5MDI1IDE5OS44MDQ4NzggMTI3NS4zMDQ1ODUgMTI3NS4zMDQ1ODUgMCAwIDAgMjcyLjIzNDE0NiAxODQuODE5NTEyYzIuNDk3NTYxIDAgMi40OTc1NjEgMCAyLjQ5NzU2MSAyLjQ5NzU2MWE4NS4zNDE2NTkgODUuMzQxNjU5IDAgMCAwIDY5LjkzMTcwNyAwbDIuNDk3NTYxLTIuNDk3NTYxYTEzNDEuMDE1NDE1IDEzNDEuMDE1NDE1IDAgMCAwIDI3Mi4yMzQxNDctMTg0LjgxOTUxMiA4NDcuNjk3MTcxIDg0Ny42OTcxNzEgMCAwIDAgMTY0LjgzOTAyNC0xOTkuODA0ODc4IDUyNS45MzYzOSA1MjUuOTM2MzkgMCAwIDAgNzQuOTI2ODI5LTI3Mi4yMzQxNDZDMTA5OC45MjY4MjkgMTU5Ljg0MzkwMiA5NDkuMDczMTcxIDAgNzY0LjI1MzY1OSAweiIgZmlsbD0iI0ZDMjc0NSIgcC1pZD0iMjg1NiI+PC9wYXRoPjxwYXRoIGQ9Ik04OTYuNjI0MzkgNDU3LjA1MzY1OWEzOC40MTI0ODggMzguNDEyNDg4IDAgMCAxLTM3LjQ2MzQxNC0zNy40NjM0MTUgMTU1LjYyMzAyNCAxNTUuNjIzMDI0IDAgMCAwLTE1NC44NDg3ODEtMTU0Ljg0ODc4MSAzNy40NjM0MTUgMzcuNDYzNDE1IDAgMCAxIDAtNzQuOTI2ODI5IDIyOS4xNzYxOTUgMjI5LjE3NjE5NSAwIDAgMSAyMjkuNzc1NjEgMjI5Ljc3NTYxIDM2Ljc4OTA3MyAzNi43ODkwNzMgMCAwIDEtMzcuNDYzNDE1IDM3LjQ2MzQxNXoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjI4NTciPjwvcGF0aD48L3N2Zz4="
            />
            {{ item.like_count }}
          </div>
          <div @click="navComment(item.id)" class="comment-room other-item">
            <image
              class="icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2OTE5MjI1NzUzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMxMTAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwMjQgNTEycTAgOTkuNDI0LTY4LjU3NiAxODMuNzEydC0xODYuMjcyIDEzMy4xNTItMjU3LjE1MiA0OC44NjRxLTQwIDAtODIuODQ4LTQuNTc2LTExMy4xNTIgMTAwLTI2Mi44NDggMTM4LjI3Mi0yOCA4LTY1LjE1MiAxMi41NzYtOS43MjggMS4xNTItMTcuNDQtNS4xNTJ0LTEwLjAxNi0xNi41NzZsMC0wLjU3NnEtMS43MjgtMi4yNzItMC4yODgtNi44NDh0MS4xNTItNS43MjggMi41Ni01LjQ0bDMuNDI0LTUuMTUydDQtNC44NjQgNC41NzYtNS4xNTJxNC00LjU3NiAxNy43MjgtMTkuNzEydDE5LjcxMi0yMS43MjggMTcuNzI4LTIyLjU2IDE4LjU2LTI5LjE1MiAxNS40MjQtMzMuNzI4IDE0Ljg0OC00My40MjRxLTg5LjcyOC01MC44NDgtMTQxLjQ0LTEyNS43Mjh0LTUxLjcxMi0xNjAuNTc2cTAtNzQuMjcyIDQwLjU3Ni0xNDIuMDE2dDEwOS4xNTItMTE2Ljg2NCAxNjMuNDI0LTc4LjAxNiAxOTguODQ4LTI4Ljg2NHExMzkuNDI0IDAgMjU3LjE1MiA0OC44NjR0MTg2LjI3MiAxMzMuMTUyIDY4LjU3NiAxODMuNzEyeiIgcC1pZD0iMzExMSIgZmlsbD0iIzEyOTZkYiI+PC9wYXRoPjwvc3ZnPg=="
            />
            {{ item.comment_count }}
          </div>
        </div>
      </div>
    </div>
    <image
      class="publish"
      @click="goPublish"
      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2OTIxMTQzNjcwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM1ODIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiAyMDkuNDU0NTQ1YzE2NS4yMzYzNjQgMCAzMDIuNTQ1NDU1IDEzNy4zMDkwOTEgMzAyLjU0NTQ1NSAzMDIuNTQ1NDU1cy0xMzcuMzA5MDkxIDMwMi41NDU0NTUtMzAyLjU0NTQ1NSAzMDIuNTQ1NDU1UzIwOS40NTQ1NDUgNjc3LjIzNjM2NCAyMDkuNDU0NTQ1IDUxMiAzNDYuNzYzNjM2IDIwOS40NTQ1NDUgNTEyIDIwOS40NTQ1NDV6IiBmaWxsPSIjRkM0OTREIiBwLWlkPSIzNTgzIj48L3BhdGg+PHBhdGggZD0iTTU5My40NTQ1NDUgMzI1LjgxODE4MmwtNDEuODkwOTA5IDQxLjg5MDkwOSA2Mi44MzYzNjQgNjIuODM2MzY0IDQxLjg5MDkwOS00MS44OTA5MS02Mi44MzYzNjQtNjIuODM2MzYzeiBtLTIxNC4xMDkwOSAyMTQuMTA5MDkxbC0xMS42MzYzNjQgNzQuNDcyNzI3IDc0LjQ3MjcyNy0xMS42MzYzNjQgMTQ2LjYxODE4Mi0xNDYuNjE4MTgxLTYyLjgzNjM2NC02Mi44MzYzNjQtMTQ2LjYxODE4MSAxNDYuNjE4MTgyek0zNzcuMDE4MTgyIDY2Ny45MjcyNzNoMjY5Ljk2MzYzNmM5LjMwOTA5MSAwIDEzLjk2MzYzNiA2Ljk4MTgxOCAxMy45NjM2MzcgMTMuOTYzNjM2IDAgOS4zMDkwOTEtNi45ODE4MTggMTMuOTYzNjM2LTEzLjk2MzYzNyAxMy45NjM2MzZIMzc3LjAxODE4MmMtOS4zMDkwOTEgMC0xMy45NjM2MzYtNi45ODE4MTgtMTMuOTYzNjM3LTEzLjk2MzYzNi0yLjMyNzI3My05LjMwOTA5MSA0LjY1NDU0NS0xMy45NjM2MzYgMTMuOTYzNjM3LTEzLjk2MzYzNnoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjM1ODQiPjwvcGF0aD48L3N2Zz4="
    />
  </div>
</template>

<script>
import Me from "../me/index";

export default {
  data() {
    return {
      dynamics: [],
      likeList: []
    };
  },
  components: { Me },
  onShow() {
    this.getDynamic();
    let likeList = wx.getStorageSync("likeList");
    if (likeList) {
      this.likeList = likeList.split(",");
    } else {
      this.likeList = [];
    }
    this.likeList = this.likeList.map(Number);
  },
  methods: {
    goPublish() {
      wx.navigateTo({
        url: "/pages/social/publish/main"
      });
    },
    getDynamic() {
      this.$fly
        .get("/dynamic/getAll?page=1")
        .then(res => {
          this.dynamics = res.data.data;
          this.dynamics.forEach(item => {
            if (item.picture[0] === "") {
              item.picture = [];
            }
            if (item.picture.indexOf(",") > 0) {
              item.picture = item.picture.split(",");
            }
            item.hadLiked = this.likeList.includes(item.id);
          });
          console.log(this.dynamics);
        })
        .catch(err => {
          console.log(err);
        });
    },
    like(dynamicId, like_count) {
      let likeList = wx.getStorageSync("likeList");

      if (likeList) {
        likeList = likeList.split(",");
      } else {
        likeList = [];
      }
      likeList = likeList.map(Number);
      console.log(likeList);
      if (!likeList.includes(dynamicId)) {
        likeList.push(dynamicId);
        console.log(likeList);
      }
      wx.setStorageSync("likeList", likeList.toString());
      this.$fly.put('/dynamic/editDynamic', {
        id: dynamicId,
        like_count: like_count + 1
      }).then(() => {
      })
    },
    navComment(dynamicId) {},
    showImg(url, urls) {
      wx.previewImage({
        current: url,
        urls: urls || [url]
      });
    }
  }
};
</script>

<style scoped>
.dynamics-room {
  margin-top: 60px;
}
.icon {
  width: 12px;
  height: 12px;
}
.ava {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgb(46, 138, 33);
  margin-left: 10px;
}
.other {
  margin: 0 auto;
  width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border: 0.5px solid gray;
  justify-content: space-between;
  background-color: #e9ddb6;
}
.other-item {
  width: 33.33%;
  text-align: center;
  color: gray;
}
.dynamics-item {
  margin-top: 20px;
}
.publish {
  position: fixed;
  right: 20px;
  bottom: 30px;
  width: 90px;
  height: 90px;
}
.title-room {
  display: flex;
  height: 40px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.name-room {
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
}
.content-room {
  margin: 15px;
}
.single-img-room {
  width: 90%;
  margin: 10px auto 10px auto;
}
.mul-img-room {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 auto;
}
.mul-img {
  width: 31%;
  height: 100px;
  margin: 5px;
}
</style>
