import 'babel-core/polyfill';
import { Base } from 'yeoman-generator';
import path from 'path';
import _ from 'lodash';

export default class WfControlGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.argument('controlName', {
            desc: 'WF control name',
            type: String,
            required: false
        });

        this.option('type', {
            desc: 'The type of WF control. Could be equal to `generic` or `informer`',
            type: String,
            alias: 't'
        });
    }

    initializing() {
        // These checks should be performed in initializing() method instead of the constructor
        // because this.env.error() call in the constructor can’t be caught with Mocha

        if (!WfControlGenerator._validateControlName(this.controlName)) {
            this.env.error(WfControlGenerator._validationErrorMessages.controlName);
        }

        if (this.options.type && !WfControlGenerator._validateControlType(this.options.type)) {
            this.env.error(WfControlGenerator._validationErrorMessages.controlType);
        }
    }

    async prompting() {
        let done = this.async();

        if (!this.controlName) {
            await this._promptControlName();
        }

        if (!this.options.type) {
            await this._promptControlType();
        }

        done();
    }

    configuring() {
        this.jsControlName = this.controlName.replace('-', '_');
    }

    writing() {
        let controlType = this.options.type;
        let templateFiles = Object.keys(WfControlGenerator._templateConfig[controlType]).map(kindName => `${controlType}/${kindName}`);

        templateFiles.forEach(kind => {
            this._writeTemplate(kind, {
                controlName: this.controlName,
                jsControlName: this.jsControlName
            });
        });
    }

    _promptControlName() {
        return new Promise(resolve => {
            let currentDirName = path.basename(this.destinationRoot());
            this.prompt({
                message: 'How would you like to name the control?',
                type: 'input',
                name: 'controlName',
                default: currentDirName,
                // `validate` callback should return `true` when everything is OK and error message otherwise
                validate: value => WfControlGenerator._validateControlName(value) ? true : WfControlGenerator._validationErrorMessage
            }, answer => {
                this.controlName = answer.controlName;
                resolve();
            });
        });
    }

    _promptControlType() {
        return new Promise(resolve => {
            this.prompt({
                message: 'What type does the control have?',
                type: 'list',
                choices: _.keys(WfControlGenerator._templateConfig),
                name: 'type'
            }, answer => {
                this.options.type = answer.type;
                resolve();
            });
        });
    }

    _writeTemplate(kind, data) {
        let [kindGroup, kindName] = kind.split('/');

        let templateConfig = WfControlGenerator._templateConfig[kindGroup][kindName];
        let templateFile = templateConfig.file;
        let targetExtension = templateConfig.targetExtension;

        this.fs.copyTpl(
            this.templatePath(templateFile),
            this.destinationPath(this.controlName + targetExtension),
            data
        );
    }

    static _validateControlName(name) {
        return /^[a-z0-9_-]+$/i.test(name);
    }

    static _validateControlType(type) {
        return Object.keys(WfControlGenerator._templateConfig).includes(type);
    }
}

WfControlGenerator._templateConfig = {
    'generic': {
        'wf': {
            file: 'generic/index.wfc',
            targetExtension: '.wfc'
        },
        'less': {
            file: 'generic/index.less',
            targetExtension: '.less'
        },
        'jsm': {
            file: 'generic/index.jsm',
            targetExtension: '.jsm'
        }
    },
    'informer': {
        'wf': {
            file: 'informer/index.wfec',
            targetExtension: '.wfec'
        },
        'less': {
            file: 'informer/index.less',
            targetExtension: '.less'
        },
        'jsm': {
            file: 'informer/index.jsm',
            targetExtension: '.jsm'
        }
    }
};

WfControlGenerator._validationErrorMessages = {
    controlName: 'The control name is invalid. It must only contain latin letters, digits, underscore and dash.',
    controlType: 'The control type is invalid. Possible values are `generic` and `informer`.'
};