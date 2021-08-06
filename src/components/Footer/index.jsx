import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced.mogan',
    defaultMessage: 'Yazılım Geliştirme Direktörlüğü',
  });
  const currentYear = 2016
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Mogan Yazılım',
          title: 'Mogan Yazılım',
          blankTarget: true,
        }
      ]}
    />
  );
};
