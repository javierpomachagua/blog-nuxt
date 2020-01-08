<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: "Abi",
        title: "Awesome Post",
        content: "Super amazing!",
        thumbnailLink:
          "https://images.pexels.com/photos/3532326/pexels-photo-3532326.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      }
    };
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>