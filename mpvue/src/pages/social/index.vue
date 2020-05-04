<template>
  <div class="social">
    <Me></Me>
    <i-message id="message" />
    <div class="dynamics-room">
      <div class="dynamics-item" v-for="(item, index) in dynamics" :key="index">
        <div class="delete-room">
          <image
            v-if="item.creator === userId"
            @click="deleteDynamic(item.id)"
            class="icon"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg3NDQ4MTk4MTIxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM0MTciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxLjMzMzMzMyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQxOCI+PC9wYXRoPjxwYXRoIGQ9Ik00Mi42NjY2NjcgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MTkiPjwvcGF0aD48cGF0aCBkPSJNNjQgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MjAiPjwvcGF0aD48cGF0aCBkPSJNODUuMzMzMzMzIDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDIxIj48L3BhdGg+PHBhdGggZD0iTTEwNi42NjY2NjcgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MjIiPjwvcGF0aD48cGF0aCBkPSJNMTI4IDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDIzIj48L3BhdGg+PHBhdGggZD0iTTE0OS4zMzMzMzMgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MjQiPjwvcGF0aD48cGF0aCBkPSJNMTcwLjY2NjY2NyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQyNSI+PC9wYXRoPjxwYXRoIGQ9Ik0xOTIgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MjYiPjwvcGF0aD48cGF0aCBkPSJNMjEzLjMzMzMzMyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQyNyI+PC9wYXRoPjxwYXRoIGQ9Ik0yMzQuNjY2NjY3IDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDI4Ij48L3BhdGg+PHBhdGggZD0iTTI1NiAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQyOSI+PC9wYXRoPjxwYXRoIGQ9Ik0yNzcuMzMzMzMzIDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDMwIj48L3BhdGg+PHBhdGggZD0iTTI5OC42NjY2NjcgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MzEiPjwvcGF0aD48cGF0aCBkPSJNMzIwIDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDMyIj48L3BhdGg+PHBhdGggZD0iTTM0MS4zMzMzMzMgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MzMiPjwvcGF0aD48cGF0aCBkPSJNMzYyLjY2NjY2NyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQzNCI+PC9wYXRoPjxwYXRoIGQ9Ik0zODQgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0MzUiPjwvcGF0aD48cGF0aCBkPSJNNDA1LjMzMzMzMyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQzNiI+PC9wYXRoPjxwYXRoIGQ9Ik00MjYuNjY2NjY3IDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDM3Ij48L3BhdGg+PHBhdGggZD0iTTQ0OCAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQzOCI+PC9wYXRoPjxwYXRoIGQ9Ik00NjkuMzMzMzMzIDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDM5Ij48L3BhdGg+PHBhdGggZD0iTTQ5MC42NjY2NjcgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NDAiPjwvcGF0aD48cGF0aCBkPSJNNTEyIDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDQxIj48L3BhdGg+PHBhdGggZD0iTTUzMy4zMzMzMzMgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NDIiPjwvcGF0aD48cGF0aCBkPSJNNTU0LjY2NjY2NyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ0MyI+PC9wYXRoPjxwYXRoIGQ9Ik01NzYgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NDQiPjwvcGF0aD48cGF0aCBkPSJNNTk3LjMzMzMzMyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ0NSI+PC9wYXRoPjxwYXRoIGQ9Ik02MTguNjY2NjY3IDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDQ2Ij48L3BhdGg+PHBhdGggZD0iTTY0MCAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ0NyI+PC9wYXRoPjxwYXRoIGQ9Ik02NjEuMzMzMzMzIDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDQ4Ij48L3BhdGg+PHBhdGggZD0iTTY4Mi42NjY2NjcgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NDkiPjwvcGF0aD48cGF0aCBkPSJNNzA0IDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDUwIj48L3BhdGg+PHBhdGggZD0iTTcyNS4zMzMzMzMgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NTEiPjwvcGF0aD48cGF0aCBkPSJNNzQ2LjY2NjY2NyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ1MiI+PC9wYXRoPjxwYXRoIGQ9Ik03NjggMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NTMiPjwvcGF0aD48cGF0aCBkPSJNNzg5LjMzMzMzMyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ1NCI+PC9wYXRoPjxwYXRoIGQ9Ik04MTAuNjY2NjY3IDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDU1Ij48L3BhdGg+PHBhdGggZD0iTTgzMiAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ1NiI+PC9wYXRoPjxwYXRoIGQ9Ik04NTMuMzMzMzMzIDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDU3Ij48L3BhdGg+PHBhdGggZD0iTTg3NC42NjY2NjcgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NTgiPjwvcGF0aD48cGF0aCBkPSJNODk2IDB2MTAyNCIgZmlsbD0iIiBwLWlkPSIzNDU5Ij48L3BhdGg+PHBhdGggZD0iTTkxNy4zMzMzMzMgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NjAiPjwvcGF0aD48cGF0aCBkPSJNOTM4LjY2NjY2NyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ2MSI+PC9wYXRoPjxwYXRoIGQ9Ik05NjAgMHYxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NjIiPjwvcGF0aD48cGF0aCBkPSJNOTgxLjMzMzMzMyAwdjEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ2MyI+PC9wYXRoPjxwYXRoIGQ9Ik0xMDAyLjY2NjY2NyAwdjEwMjRNMCAyMS4zMzMzMzNoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDY0Ij48L3BhdGg+PHBhdGggZD0iTTAgNDIuNjY2NjY3aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ2NSI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDY0aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ2NiI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDg1LjMzMzMzM2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NjciPjwvcGF0aD48cGF0aCBkPSJNMCAxMDYuNjY2NjY3aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ2OCI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDEyOGgxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NjkiPjwvcGF0aD48cGF0aCBkPSJNMCAxNDkuMzMzMzMzaDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ3MCI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDE3MC42NjY2NjdoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDcxIj48L3BhdGg+PHBhdGggZD0iTTAgMTkyaDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ3MiI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDIxMy4zMzMzMzNoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDczIj48L3BhdGg+PHBhdGggZD0iTTAgMjM0LjY2NjY2N2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NzQiPjwvcGF0aD48cGF0aCBkPSJNMCAyNTZoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDc1Ij48L3BhdGg+PHBhdGggZD0iTTAgMjc3LjMzMzMzM2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NzYiPjwvcGF0aD48cGF0aCBkPSJNMCAyOTguNjY2NjY3aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ3NyI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDMyMGgxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0NzgiPjwvcGF0aD48cGF0aCBkPSJNMCAzNDEuMzMzMzMzaDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ3OSI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDM2Mi42NjY2NjdoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDgwIj48L3BhdGg+PHBhdGggZD0iTTAgMzg0aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ4MSI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDQwNS4zMzMzMzNoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDgyIj48L3BhdGg+PHBhdGggZD0iTTAgNDI2LjY2NjY2N2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0ODMiPjwvcGF0aD48cGF0aCBkPSJNMCA0NDhoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDg0Ij48L3BhdGg+PHBhdGggZD0iTTAgNDY5LjMzMzMzM2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0ODUiPjwvcGF0aD48cGF0aCBkPSJNMCA0OTAuNjY2NjY3aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ4NiI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDUxMmgxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0ODciPjwvcGF0aD48cGF0aCBkPSJNMCA1MzMuMzMzMzMzaDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ4OCI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDU1NC42NjY2NjdoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDg5Ij48L3BhdGg+PHBhdGggZD0iTTAgNTc2aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ5MCI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDU5Ny4zMzMzMzNoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDkxIj48L3BhdGg+PHBhdGggZD0iTTAgNjE4LjY2NjY2N2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0OTIiPjwvcGF0aD48cGF0aCBkPSJNMCA2NDBoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDkzIj48L3BhdGg+PHBhdGggZD0iTTAgNjYxLjMzMzMzM2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0OTQiPjwvcGF0aD48cGF0aCBkPSJNMCA2ODIuNjY2NjY3aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ5NSI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDcwNGgxMDI0IiBmaWxsPSIiIHAtaWQ9IjM0OTYiPjwvcGF0aD48cGF0aCBkPSJNMCA3MjUuMzMzMzMzaDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ5NyI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDc0Ni42NjY2NjdoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNDk4Ij48L3BhdGg+PHBhdGggZD0iTTAgNzY4aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzQ5OSI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDc4OS4zMzMzMzNoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNTAwIj48L3BhdGg+PHBhdGggZD0iTTAgODEwLjY2NjY2N2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM1MDEiPjwvcGF0aD48cGF0aCBkPSJNMCA4MzJoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNTAyIj48L3BhdGg+PHBhdGggZD0iTTAgODUzLjMzMzMzM2gxMDI0IiBmaWxsPSIiIHAtaWQ9IjM1MDMiPjwvcGF0aD48cGF0aCBkPSJNMCA4NzQuNjY2NjY3aDEwMjQiIGZpbGw9IiIgcC1pZD0iMzUwNCI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDg5NmgxMDI0IiBmaWxsPSIiIHAtaWQ9IjM1MDUiPjwvcGF0aD48cGF0aCBkPSJNMCA5MTcuMzMzMzMzaDEwMjQiIGZpbGw9IiIgcC1pZD0iMzUwNiI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDkzOC42NjY2NjdoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNTA3Ij48L3BhdGg+PHBhdGggZD0iTTAgOTYwaDEwMjQiIGZpbGw9IiIgcC1pZD0iMzUwOCI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDk4MS4zMzMzMzNoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNTA5Ij48L3BhdGg+PHBhdGggZD0iTTAgMTAwMi42NjY2NjdoMTAyNCIgZmlsbD0iIiBwLWlkPSIzNTEwIj48L3BhdGg+PHBhdGggZD0iTTgxMCAyNzRMNTcyIDUxMmwyMzggMjM4LTYwIDYwTDUxMiA1NzIgMjc0IDgxMGwtNjAtNjBMNDUyIDUxMiAyMTQgMjc0bDYwLTYwTDUxMiA0NTJsMjM4LTIzOHoiIGZpbGw9IiIgcC1pZD0iMzUxMSI+PC9wYXRoPjwvc3ZnPg=="
          />
        </div>
        <div class="title-room">
          <div class="ava-room" style="height:100%;">
            <image class="ava" :src="item.user_ava" />
          </div>
          <div class="right-room">
            <div class="name-room">{{ item.username }}</div>
            <div class="time-room">{{ item.create_time }}</div>
          </div>
        </div>
        <div class="content-room">{{ item.article }}</div>
        <div v-if="item.picture.length > 15">
          <div class="single-img-room">
            <image
              class="single-img"
              mode="widthFix"
              @click="showImg(item.picture)"
              :src="item.picture"
            />
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
          <div class="comment-room other-item">
            <image
              class="icon"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2OTE5MjI1NzUzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMxMTAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwMjQgNTEycTAgOTkuNDI0LTY4LjU3NiAxODMuNzEydC0xODYuMjcyIDEzMy4xNTItMjU3LjE1MiA0OC44NjRxLTQwIDAtODIuODQ4LTQuNTc2LTExMy4xNTIgMTAwLTI2Mi44NDggMTM4LjI3Mi0yOCA4LTY1LjE1MiAxMi41NzYtOS43MjggMS4xNTItMTcuNDQtNS4xNTJ0LTEwLjAxNi0xNi41NzZsMC0wLjU3NnEtMS43MjgtMi4yNzItMC4yODgtNi44NDh0MS4xNTItNS43MjggMi41Ni01LjQ0bDMuNDI0LTUuMTUydDQtNC44NjQgNC41NzYtNS4xNTJxNC00LjU3NiAxNy43MjgtMTkuNzEydDE5LjcxMi0yMS43MjggMTcuNzI4LTIyLjU2IDE4LjU2LTI5LjE1MiAxNS40MjQtMzMuNzI4IDE0Ljg0OC00My40MjRxLTg5LjcyOC01MC44NDgtMTQxLjQ0LTEyNS43Mjh0LTUxLjcxMi0xNjAuNTc2cTAtNzQuMjcyIDQwLjU3Ni0xNDIuMDE2dDEwOS4xNTItMTE2Ljg2NCAxNjMuNDI0LTc4LjAxNiAxOTguODQ4LTI4Ljg2NHExMzkuNDI0IDAgMjU3LjE1MiA0OC44NjR0MTg2LjI3MiAxMzMuMTUyIDY4LjU3NiAxODMuNzEyeiIgcC1pZD0iMzExMSIgZmlsbD0iIzEyOTZkYiI+PC9wYXRoPjwvc3ZnPg=="
            />
            {{ item.comment_count }}
          </div>
        </div>
        <div class="input-room">
          <input class="comment-input" @input="changeComment" :data-id="item.id" placeholder="评论" />
          <button class="send-comment-btn" @click="sendRootComment(item);item.comment_count++">发送</button>
        </div>
        <div class="comment-room">
          <i-collapse name>
            <i-collapse-item title="查看所有评论" style="font-size:13px;color:gray" name="open">
              <view slot="content">
                <div
                  class="rootComment"
                  v-for="(commentItem, commentIndex) in item.comments"
                  :key="commentIndex"
                >
                  <div
                    @click="clickComment(item, commentItem)"
                  >{{ commentItem.commentor }} : {{ commentItem.content }}</div>
                  <div
                    class="childComment"
                    v-for="(childComment, childIndex) in commentItem.childComments"
                    :key="childIndex"
                  >
                    <div
                      @click="clickComment(item, commentItem)"
                    >{{childComment.commentor}}回复{{ childComment.replayer }}: {{ childComment.content }}</div>
                  </div>
                </div>
              </view>
            </i-collapse-item>
          </i-collapse>
        </div>
      </div>
    </div>
    <image
      class="publish"
      @click="goPublish"
      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2OTIxMTQzNjcwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM1ODIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiAyMDkuNDU0NTQ1YzE2NS4yMzYzNjQgMCAzMDIuNTQ1NDU1IDEzNy4zMDkwOTEgMzAyLjU0NTQ1NSAzMDIuNTQ1NDU1cy0xMzcuMzA5MDkxIDMwMi41NDU0NTUtMzAyLjU0NTQ1NSAzMDIuNTQ1NDU1UzIwOS40NTQ1NDUgNjc3LjIzNjM2NCAyMDkuNDU0NTQ1IDUxMiAzNDYuNzYzNjM2IDIwOS40NTQ1NDUgNTEyIDIwOS40NTQ1NDV6IiBmaWxsPSIjRkM0OTREIiBwLWlkPSIzNTgzIj48L3BhdGg+PHBhdGggZD0iTTU5My40NTQ1NDUgMzI1LjgxODE4MmwtNDEuODkwOTA5IDQxLjg5MDkwOSA2Mi44MzYzNjQgNjIuODM2MzY0IDQxLjg5MDkwOS00MS44OTA5MS02Mi44MzYzNjQtNjIuODM2MzYzeiBtLTIxNC4xMDkwOSAyMTQuMTA5MDkxbC0xMS42MzYzNjQgNzQuNDcyNzI3IDc0LjQ3MjcyNy0xMS42MzYzNjQgMTQ2LjYxODE4Mi0xNDYuNjE4MTgxLTYyLjgzNjM2NC02Mi44MzYzNjQtMTQ2LjYxODE4MSAxNDYuNjE4MTgyek0zNzcuMDE4MTgyIDY2Ny45MjcyNzNoMjY5Ljk2MzYzNmM5LjMwOTA5MSAwIDEzLjk2MzYzNiA2Ljk4MTgxOCAxMy45NjM2MzcgMTMuOTYzNjM2IDAgOS4zMDkwOTEtNi45ODE4MTggMTMuOTYzNjM2LTEzLjk2MzYzNyAxMy45NjM2MzZIMzc3LjAxODE4MmMtOS4zMDkwOTEgMC0xMy45NjM2MzYtNi45ODE4MTgtMTMuOTYzNjM3LTEzLjk2MzYzNi0yLjMyNzI3My05LjMwOTA5MSA0LjY1NDU0NS0xMy45NjM2MzYgMTMuOTYzNjM3LTEzLjk2MzYzNnoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjM1ODQiPjwvcGF0aD48L3N2Zz4="
    />
    <i-action-sheet
      :visible="showDelete"
      show-cancel
      @cancel="showDelete = false"
      :mask-closable="true"
    >
      <view slot="header" style="padding: 16px">
        <view style="color: #444;font-size: 16px">确定吗？</view>
        <text>删除后无法恢复哦</text>
        <i-button @click="stillDelete" type="warning">删除此动态</i-button>
      </view>
    </i-action-sheet>
    <i-action-sheet
      :visible="showCommentAction"
      show-cancel
      @cancel="showCommentAction = false"
      :mask-closable="true"
    >
      <view slot="header" style="padding: 16px">
        <div class="input-room">
          <input
            class="comment-input child-comment-input"
            @input="changeChildComment"
            :placeholder="'回复' + lastClickComment.commentor"
          />
          <button style="width: 20%;" class="send-comment-btn" @click="sendChildComment();">发送</button>
        </div>
      </view>
    </i-action-sheet>
  </div>
</template>

<script>
import Me from "../me/index";
import { formatDatetime, formatDateFriendly } from "../../utils/formatDatetime";
const { $Message } = require("../../../static/iview/base/index");

export default {
  data() {
    return {
      dynamics: [],
      likeList: [],
      commentMap: new Map(),
      childCommentMap: new Map(),
      showDelete: false,
      showCommentAction: false,
      userId: 0,
      deleteId: 0,
      lastClickDynamic: {},
      lastClickComment: {}
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
    this.userId = this.$store.state.userInfo.id;
  },
  methods: {
    /**
     * 导航至发送动态
     */
    goPublish() {
      wx.navigateTo({
        url: "/pages/social/publish/main"
      });
    },
    /**
     * 获取动态信息
     */
    getDynamic() {
      this.$fly
        .get("/dynamic/getAllIncludesComments?page=1")
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
            item.create_time = formatDateFriendly(new Date(item.create_time));
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 点赞方法
     */
    like(dynamicId, like_count) {
      let likeList = wx.getStorageSync("likeList");
      if (likeList) {
        likeList = likeList.split(",");
      } else {
        likeList = [];
      }
      likeList = likeList.map(Number);
      if (!likeList.includes(dynamicId)) {
        likeList.push(dynamicId);
      }
      wx.setStorageSync("likeList", likeList.toString());
      this.$fly
        .put("/dynamic/editDynamic", {
          id: dynamicId,
          like_count: like_count + 1
        })
        .then(() => {});
    },
    /**
     * 图片预览方法
     */
    showImg(url, urls) {
      wx.previewImage({
        current: url,
        urls: urls || [url]
      });
    },
    /**
     * 监听动态下根评论输入框
     */
    changeComment(e) {
      const content = e.mp.detail.value;
      const id = e.target.dataset.id;
      this.commentMap.set(id, content);
    },
    /**
     * 保存child评论输入框的内容
     */
    changeChildComment(e) {
      this.childCommentMap.set(this.lastClickComment.id, e.mp.detail.value);
    },
    /**
     * 评论点击后，更新lastClickComment，用于保存状态
     */
    clickComment(dynamic, comment) {
      this.lastClickDynamic = dynamic;
      this.lastClickComment = comment;
      this.showCommentAction = true;
    },
    /**
     * 发送根评论
     */
    sendRootComment(dynamic) {
      this.$fly
        .put("/dynamic/editDynamic", {
          id: dynamic.id,
          comment_count: dynamic.comment_count + 1
        })
        .then(() => {});
      this.$fly
        .post("/comment/newComment", {
          dynamic_id: dynamic.id,
          parent_id: 0,
          type: "",
          commentor: this.$store.state.userInfo.nick_name,
          replayer: "",
          content: this.commentMap.get(dynamic.id),
          gmt_create: formatDatetime(new Date())
        })
        .then(res => {
          $Message({
            content: "评论成功",
            type: "success"
          });
          this.getDynamic();
        });
    },
    /**
     * 发送子评论
     */
    sendChildComment() {
      let comment = this.lastClickComment;
      let dynamic = this.lastClickDynamic;
      this.$fly
        .put("/dynamic/editDynamic", {
          id: comment.dynamic_id,
          comment_count: dynamic.comment_count + 1
        })
        .then(() => {});
      this.$fly
        .post("/comment/newComment", {
          dynamic_id: dynamic.id,
          parent_id: comment.id,
          type: "",
          commentor: this.$store.state.userInfo.nick_name,
          replayer: comment.commentor,
          content: this.childCommentMap.get(comment.id),
          gmt_create: formatDatetime(new Date())
        })
        .then(res => {
          this.showCommentAction = false;
          $Message({
            content: "评论成功",
            type: "success"
          });
          this.getDynamic();
        });
    },
    /**
     * 删除动态过渡方法，保存删除动态的信息
     */
    deleteDynamic(id) {
      this.showDelete = true;
      this.deleteId = id;
    },
    /**
     * 删除动态方法
     */
    stillDelete() {
      this.$fly
        .delete("dynamic/deleteDynamic?id=" + this.deleteId)
        .then(res => {
          $Message({
            content: "删除成功",
            type: "success"
          });
          this.getDynamic();
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
  border-radius: 15px;
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
  border-top: 0.5px solid gray;
  padding-top: 10px;
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
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
}
.time-room {
  color: gray;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
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
.collapsedItem {
  vertical-align: middle;
  color: gray;
  font-size: 13px;
}
.rootComment {
  color: black;
  font-size: 14px;
}
.childComment {
  font-size: 12px;
  margin-left: 20px;
  background-color: rgb(199, 199, 199);
}
.input-room {
  margin: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.comment-input {
  width: 75%;
  height: 30px;
  padding-left: 10px;
  border: 0.5px solid rgb(111, 119, 110);
  margin: 0 auto;
  border-radius: 15px;
}
.send-comment-btn {
  width: 15%;
  height: 30px;
  background-color: #2d8cf0;
  font-size: 12px;
  color: white;
}
.delete-room {
  float: right;
  margin-right: 2px;
}
</style>