import React, { Component } from 'react';
import { Upload, Row, Col, Button, Table, notification, BackTop } from 'antd';
import XLSX from 'xlsx';
import { sum } from 'lodash';
import { UploadOutlined, DownloadOutlined, ToTopOutlined } from '@ant-design/icons';
import './myapp.css';
import Timer from './timer';

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      taizhang: [],
    };
  }

  beforeUpload(file, fileList) {
    this.setState({
      loading: true,
    })
    const { taizhang = [] } = this.state;
    const map = {};
    console.log(file, fileList);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const { result } = e.target
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = [];
        console.log(workbook.Sheets);
        const sheet = workbook.Sheets['结算审计报告关联项目表'];
        if (sheet) {
          data = data.concat(XLSX.utils.sheet_to_json(sheet));
        }
        const header = data[0];
        for (const key in header) {
          switch (header[key]) {
            case '序号': map['num'] = key; break;
            case '地市': map['city'] = key; break;
            case '项目名称': map['project_name'] = key; break;
            case '项目编码': map['project_num'] = key; break;
            case '项目类型': map['project_type'] = key; break;
            case '建设方式': map['build_method'] = key; break;
            default: ;
          }
        }
        console.log(map);
        const dataSource = [];
        for (let i = 1; i < data.length; i++) {
          const t = taizhang.find(item => item['项目编码'] === data[i][map.project_num]) || {};
          dataSource.push({
            num: data[i][map.num],
            city: data[i][map.city],
            project_name: data[i][map.project_name],
            project_num: data[i][map.project_num],
            project_type: data[i][map.project_type],
            build_method: data[i][map.build_method],
            '塔基施工专业0': t['塔基施工专业0'],
            '塔基施工专业': t['塔基施工专业'],
            '机房（柜）土建施工专业0': t['机房（柜）土建施工专业0'],
            '机房（柜）土建施工专业': t['机房（柜）土建施工专业'],
            '动力配套施工专业0': t['动力配套施工专业0'],
            '动力配套施工专业': t['动力配套施工专业'],
            '外电引入施工专业0': t['外电引入施工专业0'],
            '外电引入施工专业': t['外电引入施工专业'],
            '室内分布系统专业施工0': t['室内分布系统专业施工0'],
            '室内分布系统专业施工': t['室内分布系统专业施工'],
            '塔桅施工专业0': t['塔桅施工专业0'],
            '塔桅施工专业': t['塔桅施工专业'],
            'total0': sum([t['塔基施工专业0'], t['机房（柜）土建施工专业0'], t['动力配套施工专业0'], t['外电引入施工专业0'], t['室内分布系统专业施工0'], t['塔桅施工专业0']]),
            'total': sum([t['塔基施工专业'], t['机房（柜）土建施工专业'], t['动力配套施工专业'], t['外电引入施工专业'], t['室内分布系统专业施工'], t['塔桅施工专业']])
          })
        }
        this.setState({
          dataSource,
          loading: false,
        })
        console.log('data', data);
      } catch (e) {
        notification.warning({message: '遇到预料外的错误！'});
        console.log(e);
        this.setState({
          loading: false,
        })
      }
    }
    fileReader.readAsBinaryString(file);
    return false;
  }

  beforeUpload2(file, fileList) {
    this.setState({ loading2: true });
    const map = {};
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const { result } = e.target
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = [];
        const sheet = workbook.Sheets['sheet1'];
        if (sheet) {
          data = data.concat(XLSX.utils.sheet_to_json(sheet));
        }
        const header = data[0];
        console.log(header);
        for (const key in header) {
          switch (header[key]) {
            case '塔基施工专业0': map['塔基施工专业0'] = key; break;
            case '塔基施工专业': map['塔基施工专业'] = key; break;
            case '机房（柜）土建施工专业0': map['机房（柜）土建施工专业0'] = key; break;
            case '机房（柜）土建施工专业': map['机房（柜）土建施工专业'] = key; break;
            case '动力配套施工专业0': map['动力配套施工专业0'] = key; break;
            case '动力配套施工专业': map['动力配套施工专业'] = key; break;
            case '外电引入施工专业0': map['外电引入施工专业0'] = key; break;
            case '外电引入施工专业': map['外电引入施工专业'] = key; break;
            case '室内分布系统专业施工0': map['室内分布系统专业施工0'] = key; break;
            case '室内分布系统专业施工': map['室内分布系统专业施工'] = key; break;
            case '塔桅施工专业0': map['塔桅施工专业0'] = key; break;
            case '塔桅施工专业': map['塔桅施工专业'] = key; break;
            default: ;
          }
        }
        const taizhang = [];
        for (let i = 2; i < data.length; i++) {
          taizhang.push({
            '塔基施工专业0': data[i][map['塔基施工专业0']],
            '塔基施工专业': data[i][map['塔基施工专业']],
            '机房（柜）土建施工专业0': data[i][map['机房（柜）土建施工专业0']],
            '机房（柜）土建施工专业': data[i][map['机房（柜）土建施工专业']],
            '动力配套施工专业0': data[i][map['动力配套施工专业0']],
            '动力配套施工专业': data[i][map['动力配套施工专业']],
            '外电引入施工专业0': data[i][map['外电引入施工专业0']],
            '外电引入施工专业': data[i][map['外电引入施工专业']],
            '室内分布系统专业施工0': data[i][map['室内分布系统专业施工0']],
            '室内分布系统专业施工': data[i][map['室内分布系统专业施工']],
            '塔桅施工专业0': data[i][map['塔桅施工专业0']],
            '塔桅施工专业': data[i][map['塔桅施工专业']],
            '项目编码': data[i]['项目编号'],
          })
        }
        this.setState({
          taizhang,
          loading2: false,
        })
      } catch (e) {
        this.setState({
          loading2: false,
        })
        notification.warning({message: '遇到预料外的错误！'});
        console.log(e);
      }
    }
    fileReader.readAsBinaryString(file);
    return false;
  }

  exportToExcel() {
    this.setState({
      loading3: true,
    })
    const filename = '汇总表';
    const table = document.querySelector('#export-table table');
    table.border = '1';
    const content = table.outerHTML;
    const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const exBlob = new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(exBlob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
    table.border = '0';
    this.setState({
      loading3: false,
    })
  }

  render() {
    const { dataSource = [], taizhang = [], loading2, loading, loading3 } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'num',
        render: (_, record, index) => index + 1,
        width: 80,
        align: 'center',
      },
      {
        title: '所属地',
        dataIndex: 'city',
        width: 120,
        align: 'center',
      },
      {
        title: '项目名称',
        dataIndex: 'project_name',
        width: 400,
        align: 'center',
      },
      {
        title: '项目编号',
        dataIndex: 'project_num',
        width: 200,
        align: 'center',
      },
      {
        title: '项目类型',
        dataIndex: 'project_type',
        width: 200,
        align: 'center',
      },
      {
        title: '建设方式',
        dataIndex: 'build_method',
        width: 100,
        align: 'center',
      },
      {
        title: '送审金额（元）',
        key: '送审金额',
        width: 700,
        align: 'center',
        children: [
          {
            title: '塔基施工专业',
            dataIndex: '塔基施工专业0',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#e3b4b8',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '机房（柜）土建施工专业',
            dataIndex: '机房（柜）土建施工专业0',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#e3b4b8',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '动力配套施工专业',
            dataIndex: '动力配套施工专业0',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#e3b4b8',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '外电引入施工专业',
            dataIndex: '外电引入施工专业0',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#e3b4b8',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '室内分布系统专业施工',
            dataIndex: '室内分布系统专业施工0',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#e3b4b8',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '塔桅施工专业',
            dataIndex: '塔桅施工专业0',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#e3b4b8',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '合计',
            dataIndex: 'total0',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#eb261a',
                  color: '#ffffff',
                }
              }
            },
            render: val => val.toFixed(2),
            align: 'center',
          },
        ]
      },
      {
        title: '审定金额（元）',
        key: '审定金额',
        width: 700,
        align: 'center',
        children: [
          {
            title: '塔基施工专业',
            dataIndex: '塔基施工专业',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#b2cf87',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '机房（柜）土建施工专业',
            dataIndex: '机房（柜）土建施工专业',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#b2cf87',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '动力配套施工专业',
            dataIndex: '动力配套施工专业',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#b2cf87',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '外电引入施工专业',
            dataIndex: '外电引入施工专业',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#b2cf87',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '室内分布系统专业施工',
            dataIndex: '室内分布系统专业施工',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#b2cf87',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '塔桅施工专业',
            dataIndex: '塔桅施工专业',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#b2cf87',
                  color: '#ffffff',
                }
              }
            },
            align: 'center',
          },
          {
            title: '合计',
            dataIndex: 'total',
            width: 100,
            onCell: record => {
              return {
                style: {
                  backgroundColor: '#eb261a',
                  color: '#ffffff',
                }
              }
            },
            render: val => val.toFixed(2),
            align: 'center',
          },
        ]
      },
      {
        title: '审增（+）审减（-）',
        dataIndex: 'total-total0',
        width: 100,
        render: (_, record) => (record.total - record.total0).toFixed(2),
        align: 'center',
      },
    ]
    return (
      <React.Fragment>
        <Timer />
        <Row gutter={48} style={{ margin: '20px 0' }}>
          <Col md={8} sm={24} xs={24} style={{
            marginBottom: '10px'
          }}>
            <label htmlFor="upload2" style={{color: '#fff'}}>结算台账：</label>
            <Upload
              accept=".xls, .xlsx"
              name="upload2"
              showUploadList={true}
              action={null}
              beforeUpload={this.beforeUpload2.bind(this)}
            >
              <Button icon={<UploadOutlined />} loading={loading2} ghost>
                导入结算台账
              </Button>
            </Upload>
          </Col>
          <Col md={8} sm={24} xs={24} style={{
            marginBottom: '10px'
          }}>
            <label htmlFor="upload" style={{color: '#fff'}}>PROJECTINFO：</label>
            <Upload
              accept=".xls, .xlsx"
              name="upload"
              showUploadList={true}
              action={null}
              beforeUpload={this.beforeUpload.bind(this)}
              disabled={taizhang.length === 0}
            >
              <Button icon={<UploadOutlined />} loading={loading} disabled={taizhang.length === 0} ghost>
                导入PROJECTINFO
              </Button>
            </Upload>
          </Col>
          <Col md={8} sm={24} xs={24} style={{
            marginBottom: '10px'
          }}>
            <Button type="primary" icon={<DownloadOutlined />} onClick={this.exportToExcel.bind(this)} disabled={dataSource.length === 0} loading={loading3}>
              导出
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          id="export-table"
          scroll={{ x: 100 + sum(columns.map(item => item.width))}}
          loading={loading}
          rowKey="project_num"
        />
        <p style={{color: '#ad9d9d', fontSize: '3px', padding: '6em 0', textAlign: 'left'}}>可能你再也不会打开这个页面了，可能也是我最后为你做的一件事。</p>
        <p style={{color: '#ad9d9d', textAlign: 'left'}}>希望你每天幸福。2020-09-20 21:22</p>
        <BackTop>
          <div className="backtop-div">
            <ToTopOutlined style={{fontSize: '30px'}} />
          </div>
        </BackTop>
      </React.Fragment>
    );
  }
}
