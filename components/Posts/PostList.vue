<template>
  <section class="featured-posts">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://media.istockphoto.com/photos/splash-fresh-drop-in-water-close-up-picture-id801948192?k=6&m=801948192&s=612x612&w=0&h=2wLI0HnMW0UcMk8oXh7-yFUMiBivUknG9TcnnLnsnGM="
      title="Hello there!"
      previewText="This is my first post"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://images.freeimages.com/images/large-previews/25d/eagle-1523807.jpg"
      title="Hello there!"
      previewText="This is my second post"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://images.freeimages.com/images/large-previews/535/natural-wonders-1400924.jpg"
      title="Hello there!"
      previewText="This is my third post"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>