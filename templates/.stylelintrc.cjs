// 导出一个配置对象，用于配置stylelint的规则
module.exports = {
  root: true, // 表明这个配置是根配置
  extends: ['stylelint-config-standard', 'stylelint-config-standard-less'], // 继承两标准配置
  plugins: ['stylelint-order'], // 使用stylelint-order插件
  overrides: [
    {
      files: ['**/*.vue'], // 针对所有.vue文件
      customSyntax: 'postcss-html' // 使用postcss-html解析.vue文件中的样式
    }
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json'], // 忽略对.js,.jsx,.tsx,.ts,.json文件的检查
  rules: {
    // 自定义规则开始
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', ':deep'] // 不检查自定义的深度选择器
      }
    ],
    'no-descending-specificity': null, // 禁止选择器具体度下降
    'function-url-quotes': 'always', // URL总是使用引号
    'color-hex-length': 'long', // 使用长十六进制颜色值
    'rule-empty-line-before': 'never', // 规则之前不允许空行
    'font-family-no-missing-generic-family-keyword': null, // 不检查是否缺少通用字体关键字
    'selector-type-no-unknown': null, // 不检查未知的元素类型选择器
    'at-rule-no-unknown': null, // 不检查未知的@规则
    'no-duplicate-selectors': null, // 不检查重复的选择器
    'property-no-unknown': null, // 不检查未知的属性
    'no-empty-source': null, // 不检查空的源
    'selector-class-pattern': null, // 不检查类选择器的模式
    'keyframes-name-pattern': null, // 不检查关键帧名称的模式
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'deep'] }], // 不检查未知的伪类选择器，但允许'global'和'deep'
    'function-no-unknown': null, // 不检查未知的函数
    'order/properties-order': [
      // 这里列出了一个详细的属性顺序列表，用于规范CSS属性的排序
      'display',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
