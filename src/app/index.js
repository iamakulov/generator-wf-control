import { Base } from 'yeoman-generator';
import path from 'path';

export default class WfControlGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.argument('controlName', {
            desc: 'WF control name',
            type: String,
            required: false
        });
    }

    prompting() {
        if (!this.controlName) {
            this._promptControlName();
        }
    }

    configuring() {
        this.jsControlName = this.controlName.replace('-', '_');
    }

    writing() {
        ['wfc', 'less', 'jsm'].forEach(kind => {
            this._writeTemplate(kind, {
                controlName: this.controlName,
                jsControlName: this.jsControlName
            });
        });
    }

    _promptControlName() {
        let done = this.async();

        let currentDirName = path.basename(this.destinationRoot());
        this.prompt({
            message: 'How would you like to name the control?',
            type: 'input',
            name: 'controlName',
            default: currentDirName
        }, answer => {
            this.controlName = answer.controlName;
            done();
        });
    }

    _writeTemplate(kind, data) {
        var templateConfig = WfControlGenerator._templateConfig[kind];
        let templateFile = templateConfig.file;
        let targetExtension = templateConfig.targetExtension;

        this.fs.copyTpl(
            this.templatePath(templateFile),
            this.destinationPath(this.controlName + targetExtension),
            data
        );
    }
}

WfControlGenerator._templateConfig = {
    'wfc': {
        file: 'index.wfc',
        targetExtension: '.wfc'
    },
    'less': {
        file: 'index.less',
        targetExtension: '.less'
    },
    'jsm': {
        file: 'index.jsm',
        targetExtension: '.jsm'
    }
};