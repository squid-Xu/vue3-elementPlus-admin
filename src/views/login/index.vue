<template>
    <div class="login-main">
        <div class="login-title">河南省政务大数据平台 统一身份认证</div>
        <div class="login-container">
            <div class="login-form">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :size="formSize">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入账号">
                            <template #prefix>
                                <svg-icon icon-class="username" class="icon-size" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" show-password v-model="ruleForm.password" placeholder="请输入密码">
                            <template #prefix>
                                <svg-icon icon-class="password" class="icon-size" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-wrap-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="foget">忘记密码？</div>
            </div>
        </div>
        <div class="bottom-app">支持协同办公APP</div>
    </div>
</template>
<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';
interface RuleForm {
    username: string;
    password: string;
}
const formSize = ref<ComponentSize>('large');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
    username: '',
    password: ''
});
const rules = reactive<FormRules<RuleForm>>({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('error submit!', fields);
        }
    });
};
</script>
<style lang="scss" scoped>
.login-main {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images//login//login-bg.png');
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.login-title {
    width: 919px;
    box-sizing: border-box;
    padding: 0 50px;
    font-weight: 700;
    font-size: 58px;
    color: #ffffff;
    line-height: 83px;
    letter-spacing: 17px;
    text-align: center;
}
.login-container {
    margin-top: 50px;
    width: 460px;
    background: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(7, 49, 112, 0.3);
    border-radius: 6px;
}
.login-form {
    padding: 60px 30px;
    .icon-size {
        font-size: 20px;
    }
    .login-wrap-btn {
        width: 100%;
    }
    .foget {
        font-weight: 400;
        font-size: 14px;
        color: #0e5ed8;
        line-height: 30px;
        text-align: center;
    }
}
.bottom-app {
    margin-top: 25px;
    margin-bottom: 100px;
    height: 24px;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
}
</style>
