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
                                        <Input v-model="outlook.client_id" placeholder="client_id" class="input_value">
                                            <span slot="prepend">client_id</span>
                                        </Input>
                                        <Input v-model="outlook.client_secret" placeholder="client_secret"
                                               class="input_value">
                                            <span slot="prepend">client_secret</span>
                                        </Input>
                                        <Button class="input_value">保存</Button>
                                        <Button type="primary" class="input_value">授权</Button>
                                    </div>
                                </Card>
                                <br/>
                                <!--调用时间-->
                                <Card style="width:350px">
                                    <p slot="title">调用时间配置</p>
                                    <div>
                                        <Input v-model="cron_time.cron_time" placeholder="单位: 秒" class="input_value">
                                            <span slot="prepend">调用时间间隔</span>
                                        </Input>
                                        <Input v-model="cron_time.cron_time_random_start"
                                               placeholder="格式：10-60" class="input_value">
                                            <span slot="prepend" class="input_value">随机时间范围</span>
                                        </Input>
                                        <Button type="primary" class="input_value">保存</Button>
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
                            <TabPane label="日志查询" name="name2">
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
export default {
  name: 'Home',
  data () {
    return {
      theme: 'ligth',
      value: 'test',
      outlook: {
        client_id: '',
        client_secret: ''
      },
      cron_time: {
        cron_time: 0,
        cron_time_random_start: 0,
        cron_time_random_end: 0
      },
      log: [
        {
          title: '调用时间',
          key: 'time'
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
      log_data: [
        {
          time: '2020-03-23 17:00:03',
          result: '成功',
          msg: 'ok',
          originalMsg: 'fddddddddddddddddfddddddddddd'
        }, {
          time: '2020-03-23 17:00:03',
          result: '成功',
          msg: 'ok',
          originalMsg: 'fddddddddddddddddfddddddddddd'
        }
      ]
    }
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
