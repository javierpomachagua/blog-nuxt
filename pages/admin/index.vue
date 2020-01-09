<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList is-admin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
import AppButton from "@/components/UI/AppButton";

export default {
  layout: 'admin',
  components: {
    PostList,
    AppButton
  },
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
          {
            id: "1",
            title: "First Post",
            previewText: "This is preview text",
            thumbnail:
              "https://images.freeimages.com/images/large-previews/25d/eagle-1523807.jpg"
          },
          {
            id: "2",
            title: "Second Post",
            previewText: "This is preview text",
            thumbnail:
              "https://images.pexels.com/photos/3493772/pexels-photo-3493772.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          },
          {
            id: "3",
            title: "Third Post",
            previewText: "This is preview text",
            thumbnail:
              "https://images.pexels.com/photos/3532326/pexels-photo-3532326.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }
        ]
      });
    }, 1500);
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>