<template>
  <div class="row">
    <hr />
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4>Your Data</h4>
        </div>
        <div class="panel-body">
          <p>Full Name: {{userData.fullName}}</p>
          <p>Mail: {{userData.email}}</p>
          <p>Password: {{userData.password}}</p>
          <p>Store in Database?: {{userData.isStored}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userData"]
};
</script>

<style scoped>
</style>