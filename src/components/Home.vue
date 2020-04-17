<template>
  <div>
    <div style="margin: 0 auto;height: 10%;width: 95%;">
      <h2>E5续订</h2>
    </div>
    <div style="margin: 0 auto;width: 95%;">
      <Row>
        <Col span="4">col-4</Col>
        <Col span="16">
          <div>
            <Tabs>
              <TabPane label="基础配置" name="name1">
                <!--保存key-->
                <Card style="width:350px">
                  <p slot="title">Key配置</p>
                  <div>
                    <Input v-model="outlook.clientId" placeholder="client_id" class="input_value">
                      <span slot="prepend">client_id</span>
                    </Input>
                    <Input v-model="outlook.clientSecret" placeholder="client_secret"
                           class="input_value">
                      <span slot="prepend">client_secret</span>
                    </Input>
                    <Button class="input_value" :loading="outlookSaveLoading" v-on:click="outlookSave()">
                      <span v-if="!outlookSaveLoading">保存</span>
                      <span v-else>Loading...</span>
                    </Button>
                    <Button type="primary" :loading="authorizeOutlookLoading" class="input_value" v-on:click="authorizeOutlook()">
                      <span v-if="!authorizeOutlookLoading">授权</span>
                      <span v-else>Loading...</span>
                    </Button>
                  </div>
                </Card>
                <br/>
                <!--调用时间-->
                <Card style="width:350px">
                  <p slot="title">调用时间范围配置</p>
                  <div>
                    <Input v-model="outlook.cronTimeText" placeholder="单位: 秒" class="input_value">
                      <span slot="prepend">调用时间范围</span>
                    </Input>
                    <!-- <Input v-model="cron_time.cron_time_random_start"
                            placeholder="格式：10-60" class="input_value">
                         <span slot="prepend" class="input_value">随机时间范围</span>
                     </Input>-->
                    <Button type="primary" :loading="saveRandomTimeLoading"  class="input_value" v-on:click="saveRandomTime()">
                      <span v-if="!saveRandomTimeLoading">保存</span>
                      <span v-else>Loading...</span>
                    </Button>

                    <div style="margin: 1% 5%">
                      说明：单位 秒（最低调用频率为 60 秒,最高为6小时）
                      <ul>
                        <li>范围，例如: 30-60,代表在30秒-60秒之间随机调用一次</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                <br/>
                <!--操作-->
                <Card style="width:350px">
                  <p slot="title">操作</p>
                  <!--                  <Switch true-color="#13ce66" false-color="#ff4949"/>-->
                  <Button type="error" class="input_value">删除本网站账号及所有信息</Button>
                </Card>
              </TabPane>
              <!--日志显示-->
              <TabPane label="日志查询" name="name2" v-on:click="outlookSave()" v-on:change="outlookSave()">
                <Table :columns="log" :data="log_data"></Table>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        <Col span="4">col-4</Col>
      </Row>
    </div>
  </div>
</template>

<script>
import qs from 'QS'

export default {
  name: 'Home',
  data () {
    return {
      theme: 'ligth',
      value: 'test',
      outlookSaveLoading: false,
      authorizeOutlookLoading: false,
      saveRandomTimeLoading: false,
      outlook: {
        clientId: '',
        clientSecret: '',
        cronTime: 0,
        cronTimeRandomStart: 0,
        cronTimeRandomEnd: 0,
        cronTimeText: ''
      },
      log: [
        {
          title: '调用时间',
          key: 'callTime'
        },
        {
          title: '调用结果',
          key: 'result'
        },
        {
          title: '信息',
          key: 'msg'
        },
        {
          title: '原始信息',
          key: 'originalMsg'
        }
      ],
      log_data: []
    }
  },
  methods: {
    authorizeOutlook () {
      let _this = this
      if (_this.outlook.clientId.length < 1 || _this.outlook.clientSecret < 1) {
        _this.$Notice.error({
          _this: '请先进行保存!'
        })
        return
      }
      _this.authorizeOutlookLoading = true
      _this.$axios.get('/outlook/auth2/getAuthorizeUrl')
        .then(function (res) {
          _this.authorizeOutlookLoading = false
          if (res.data.code === 0) {
            window.location.href = res.data.data
          } else {
            _this.$Notice.error({
              title: '请先进行保存!'
            })
          }
        }).catch(function (error) {
          if (!error.response) {

          }
        })
    },
    outlookSave () {
      let _this = this
      if (_this.outlook.clientId.length < 1 || _this.outlook.clientSecret < 1) {
        this.$Notice.error({
          title: '都没输入数据，保存啥呀?'
        })
        return
      }
      _this.outlookSaveLoading = true
      _this.$axios({
        method: 'post',
        url: '/outlook/outlook/save',
        data: qs.stringify({
          client_id: _this.outlook.clientId,
          client_secret: _this.outlook.clientSecret
        })
      }).then(res => {
        if (res.data.code === 0) {
          this.$Notice.success({
            title: '保存成功'
          })
        } else {
          this.$Notice.error({
            title: res.data.msg
          })
        }
        _this.outlookSaveLoading = false
      }).catch(error => {
        if (!error.response) {

        }
        console.log(error)
      })
    },
    saveRandomTime () {
      let _this = this
      _this.saveRandomTimeLoading = true
      _this.$axios({
        method: 'post',
        url: '/outlook/outlook/saveRandomTime',
        data: qs.stringify({
          cronTime: 3600,
          crondomTime: _this.outlook.cronTimeText
        })
      }).then(res => {
        if (res.data.code === 0) {
          this.$Notice.success({
            title: '调用时间范围-保存成功'
          })
        } else {
          this.$Notice.error({
            title: res.data.msg
          })
        }
        _this.saveRandomTimeLoading = false
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    // 获取用户信息
    let _this = this
    _this.$axios.get('/outlook/outlook/getOutlookInfo')
      .then(function (res) {
        _this.outlook = res.data.data
        _this.outlook.cronTimeText = _this.outlook.cronTimeRandomStart + '-' + _this.outlook.cronTimeRandomEnd
      }).catch(function (error) {
        if (!error.response) {

        }
      })
      // 日志
    _this.$axios.get('/outlookLog/findLog').then(function (res) {
      let data_ = res.data
      for (let i = 0; i < data_.length; i++) {
        data_[i].callTime = _this.$moment(data_[i].callTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        _this.log_data = data_
      }
    }).catch(function (error) {
      if (!error.response) {

      }
    })
  }
}
</script>

<style scoped>
  .wrapper-header-nav-list {
    height: inherit;
    float: right;
  }

  .input_value {
    width: 300px;
    margin: 5px;
  }
</style>
