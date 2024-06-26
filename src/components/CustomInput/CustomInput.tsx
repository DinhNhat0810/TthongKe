import {
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from "antd";

const CustomInput = ({
  value,
  onChange,
  label,
  labelHorizontal,
  name,
  placeholder,
  size,
  configBoderRadius,
  config,
  type = "text",
  rules,
  formItemStyle,
  options,
  selectWidth,
  defaultValue,
  stylelabel,
  onChangeRadio,
  onChangeCheckbox,
  gutter,
  ...inputProps
}: {
  value?: string;
  onChangeRadio?: (e: RadioChangeEvent) => void;
  onChangeCheckbox?: (checkedValues: any) => void;
  [key: string]: any;
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: configBoderRadius,
          ...config,
        },
      }}
    >
      {label && (
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.2,
            ...stylelabel,
          }}
        >
          {label}
          {rules && rules[0]?.required && (
            <span style={{ color: "red" }}>*</span>
          )}
        </p>
      )}
      <Form.Item
        style={formItemStyle}
        rules={rules}
        name={name}
        label={labelHorizontal}
      >
        {type === "text" && (
          <Input placeholder={placeholder} size={size} {...inputProps} />
        )}
        {type === "password" && (
          <Input.Password
            placeholder={placeholder}
            size={size}
            {...inputProps}
          />
        )}
        {type === "date" && (
          <DatePicker placeholder={placeholder} {...inputProps} />
        )}

        {type === "select" && (
          <Select
            placeholder={placeholder}
            defaultValue={defaultValue}
            style={{ width: selectWidth }}
            onChange={onChange}
            options={options}
            {...inputProps}
          />
        )}

        {type === "radio" && (
          <Radio.Group
            onChange={onChangeRadio}
            options={options}
            value={value}
            {...inputProps}
          ></Radio.Group>
        )}

        {type === "checkbox" && (
          <Checkbox.Group onChange={onChangeCheckbox} {...inputProps}>
            <Row gutter={gutter}>
              {options?.map((option: any, index: number) => {
                return (
                  <Col key={index} span={option?.span || 8}>
                    <Checkbox value={option?.value}>{option?.label}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        )}
      </Form.Item>
    </ConfigProvider>
  );
};

export default CustomInput;
