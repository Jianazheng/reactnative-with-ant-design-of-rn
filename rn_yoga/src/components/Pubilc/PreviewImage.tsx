import React, { Component, PropTypes } from 'react';
import {
    View,
    Modal,
    ToastAndroid,
    ActivityIndicator, CameraRoll,
} from 'react-native';
import { mainStyle, setSize, screenW, screenH } from '../../public/style/style';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Toast } from '@ant-design/react-native';
import { isios } from '../../tools/function';
interface Props {
    curentImage: string,
    imaeDataUrl: object,
    modalVisible: boolean,
    cancel: () => void
}
export default class PreviewImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: true,

        };
        this.renderLoad = this.renderLoad.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this._Close = this._Close.bind(this);
    }
    _Close() {
        if (this.props.cancel) this.props.cancel();
    }
    renderLoad() { //这里是写的一个loading
        return (
            <View style={{ marginTop: (screenH / 2) - 20 }}>
                <ActivityIndicator animating={this.state.animating} size={"large"} />
            </View>
        )
    }
    savePhoto() {
        let index = this.props.curentImage;
        let url = 'http://' + this.props.imaeDataUrl[index];
        if (isios()) {
            let promise = CameraRoll.saveToCameraRoll(url);
            promise.then(function (result) {
                Toast.info("图片已保存至相册")
            }).catch(function (error) {
                Toast.info('保存失败');
            });
        } else {
            const RNFS = require('react-native-fs'); //文件处理
            const storeLocation = `${RNFS.ExternalDirectoryPath}`;
            let pathName = new Date().getTime() + "文件名.png"
            let downloadDest = `${storeLocation}/${pathName}`;
            const ret = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest });
            ret.promise.then(res => {
                console.log(res)
                if (res && res.statusCode === 200) {
                    var promise = CameraRoll.saveToCameraRoll(downloadDest);
                    promise.then(function (result) {
                        console.log(result)
                        ToastAndroid.show("图片已保存至相册", 1.4);
                    }).catch(function (error) {
                        console.log(error);
                        ToastAndroid.show('保存失败', 1.4);
                    })
                }
            })
        }

    }

    render() {
        let { imaeDataUrl, modalVisible, curentImage } = this.props;
        // let IsArray = Array.isArray(this.props.imaeDataUrl)
        let ImageObjArray = [];
        for (let i = 0; i < imaeDataUrl.length; i++) {
            let Obj = {};
            Obj.url = 'http://' + imaeDataUrl[i];
            ImageObjArray.push(Obj)
        }
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={modalVisible}
                //    onRequestClose={() => { this._pressSignClose() }}
                >
                    <ImageViewer
                        imageUrls={ImageObjArray} // 照片路径
                        enableImageZoom={false} // 是否开启手势缩放
                        saveToLocalByLongPress={true} //是否开启长按保存
                        index={curentImage} // 初始显示第几张
                        // failImageSource={} // 加载失败图片
                        loadingRender={this.renderLoad}
                        enableSwipeDown={false}
                        menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
                        onChange={(index) => { }} // 图片切换时触发
                        onClick={() => { this._Close() }}
                        onSave={(url) => { this.savePhoto(url) }}
                    />
                </Modal>

            </View>

        );
    }

}