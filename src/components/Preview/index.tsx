import { useState } from 'react';
import * as styles from './index.module.scss';
import { PreviewProp } from '../../libs/type';
import { rulerHeight } from '../../libs/constants';
import { getFontFamily } from '../../libs/utils';
import Pager from './Pager';
import Schema from '../Schemas';
import Paper from '../../components/Paper';
import { useUiPreProcessor } from '../../libs/hooks';

const LabelEditorPreview = ({ template, inputs, size, onChangeInput }: PreviewProp) => {
  const { backgrounds, pageSizes, scale } = useUiPreProcessor({
    template,
    size,
    offset: rulerHeight,
  });

  const [pageCursor, setPageCursor] = useState(0);

  const handleChangeInput = ({ key, value }: { key: string; value: string }) => {
    if (onChangeInput) {
      onChangeInput({ index: pageCursor, key, value });
    }
  };

  const editable = Boolean(onChangeInput);
  const input = inputs[pageCursor];
  const schemas = template.schemas;

  return (
    <div
      className={styles.wrapper}
      style={{ fontFamily: getFontFamily(template.fontName), ...size }}
    >
      <Pager pageCursor={pageCursor} pageNum={inputs.length} setPageCursor={setPageCursor} />
      <Paper
        scale={scale}
        schemas={schemas}
        pageSizes={pageSizes}
        backgrounds={backgrounds}
        render={({ schema, paperSize, background }) => (
          <>
            <img {...paperSize} src={background} alt="background" />
            {Object.entries(schema).map((entry) => {
              const [key, s] = entry;
              return (
                <Schema
                  key={key}
                  schema={Object.assign(s, { key, id: key, data: input[key] ? input[key] : '' })}
                  editable={editable}
                  placeholder={template.sampledata[0][key] || ''}
                  tabIndex={(template.columns.findIndex((c) => c === key) || 0) + 100}
                  onChange={(value) => handleChangeInput({ key, value })}
                  border={editable ? '1px dashed #4af' : 'transparent'}
                />
              );
            })}
          </>
        )}
      />
    </div>
  );
};

export default LabelEditorPreview;
