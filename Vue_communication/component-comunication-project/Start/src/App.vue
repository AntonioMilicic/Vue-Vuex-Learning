<template>
  <div class="container">
    <app-header />
    <app-progress :quoteCount="quotes.length" :maxQuotes="maxQuotes" />
    <app-input-quote @quoteAdded="newQuote"></app-input-quote>
    <app-quotes :quotes="quotes" @quoteDeleted="deleteQuote"></app-quotes>
    <app-footer />
  </div>
</template>

<script>
import Header from "./components/shared/Header.vue";
import Footer from "./components/shared/Footer.vue";
import ProgressBar from "./components/quoteInput/Progress.vue";
import Input from "./components/quoteInput/Input.vue";
import QuoteContainer from "./components/quoteOutput/QuoteContainer.vue";

export default {
  data: function() {
    return {
      quotes: ["Just a test quote"],
      maxQuotes: 10
    };
  },
  components: {
    appHeader: Header,
    appProgress: ProgressBar,
    appFooter: Footer,
    appInputQuote: Input,
    appQuotes: QuoteContainer
  },
  methods: {
    newQuote(quote) {
      if (this.quotes.length >= this.maxQuotes)
        return alert("Please delete quotes first");
      this.quotes.push(quote);
    },
    deleteQuote(index) {
      this.quotes.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
