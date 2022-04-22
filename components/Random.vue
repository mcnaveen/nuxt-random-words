<!-- Please remove this file from your project -->
<template>
  <div class="flex justify-center items-center h-screen bg-gray-800">
    <div
      class="block max-w-sm p-4 m-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <h2
        class="mb-2 items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-2"
      >
        🧠 Random English Words
      </h2>

      <p
        v-if="$fetchState.pending"
        class="text-gray-700 dark:text-gray-400 p-2"
      >
       ⌛ Loading...
      </p>
      <p
        v-else-if="$fetchState.error"
        class="text-gray-700 dark:text-gray-400 p-2"
      >
        Error while fetching word
      </p>
      <div v-else>
        <div v-for="(word, index) in words" :key="index">
          <h3 class="font-normal text-xl text-gray-700 dark:text-gray-400 p-2">
            Word: {{ word.word }}
          </h3>
          <p class="font-normal text-xl text-gray-700 dark:text-gray-400 p-2">
            Definition: <span class="blur hover:blur-none hover:select-none">{{ word.definition }}</span>
          </p>
          <p class="font-normal text-xl text-gray-700 dark:text-gray-400 p-2">
            Pronunciation: {{ word.pronunciation }}
          </p>
        </div>
      </div>
      <div class="grid justify-items-end">
        <button
          @click="$fetch"
          class="bg-gray-700 hover:bg-green-500 outline-none font-normal text-sm text-gray-200 dark:text-white p-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-500 dark:text-green-500 hover:text-white dark:hover:text-white shadow-md"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomWords',
  data() {
    return {
      words: [],
    }
  },
  async fetch() {
    this.words = await fetch('https://random-words-api.vercel.app/word')
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
