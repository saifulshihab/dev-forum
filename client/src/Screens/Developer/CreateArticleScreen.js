import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import { articleCreate } from '../../redux/action/ArticleAction';
import { Editor } from '@tinymce/tinymce-react';
import Spinner from '../../Components/Spinner';

const CreateArticleScreen = () => {
  const dispatch = useDispatch();
  const createArticle = useSelector((state) => state.createArticle);
  const { loading, success, error } = createArticle;

  const formValidationSchema = yup.object().shape({
    title: yup
      .string()
      .min(3, 'Minimum 3 character!')
      .max(100, 'Maximum 100 character!')
      .required('Title Required!'),
    description: yup
      .string()
      .min(50, 'Minimum 50 character!')
      .max(10000, 'Maximum 10000 character!')
      .required('Description Required!'),
  });
  return (
    <div className='bg-white dark:bg-gray-800 px-3 py-2 mt-2 rounded shadow'>
      <div>
        <h2 className='font-semibold text-gray-600 text-xl'>
          Write an Article
        </h2>
      </div>
      <Formik
        initialValues={{ title: '', description: '', tags: [] }}
        validationSchema={formValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          dispatch(articleCreate(data));
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <form onSubmit={handleSubmit}>
            <MyTextField
              label='Title'
              name='title'
              type='text'
              placeholder='Article Title'
            />
            <label
              htmlFor='article_body'
              className='block mt-2 mb-1 font-semibold text-xs dark:text-gray-300 text-gray-600 uppercase'
            >
              Description
            </label>
            <Field name='description'>
              {({ field, meta }) => (
                <div>
                  <Editor
                  style={{backgroundColor: 'transparent'}}
                    id='article_body'
                    apiKey={process.env.TINY_MCE_KEY}
                    initialValue='Write...'                    
                    init={{
                      height: 500,
                      menubar: true,                      
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help',
                    }}
                    onEditorChange={(content) => {
                      values.description = content;
                    }}
                    outputFormat='html' /// will be fix later for input rich text
                    {...field}
                  />
                  {meta.touched && meta.error ? (
                    <div className='text-red-500 text-sm'>{meta.error}</div>
                  ) : null}
                </div>
              )}
            </Field>
            <FieldArray
              name='tags'
              render={(arrayHelpers) => (
                <div className='flex items-center mt-2'>
                  <div className='w-2/5'>
                    <label className='block dark:text-gray-300 mt-2 text-xs font-semibold text-gray-600 uppercase'>
                      Tags
                    </label>
                  </div>
                  <div className='w-3/5 border border-blue-300 p-2 rounded'>
                    {values.tags?.length > 0 ? (
                      values.tags?.map((data, idx) => (
                        <div
                          key={idx}
                          className='float-left mr-2 flex items-center'
                        >
                          <Field
                            type='text'
                            name={`tags.${idx}`}
                            value={data}
                            className='border dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 focus:border-indigo-300 rounded focus:outline-none text-sm px-1'
                          />
                          <div className='ml-2 flex text-gray-400 items-center space-x-2 justify-center'>
                            <button
                              type='button'
                              onClick={() => arrayHelpers.remove(idx)}
                            >
                              <i className='far fa-trash-alt'></i>
                            </button>
                            <button
                              type='button'
                              onClick={() => arrayHelpers.insert(idx, '')}
                            >
                              <i className='fas fa-plus'></i>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <button
                        className='focus:outline-none dark:text-gray-300 text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
                        type='button'
                        onClick={() => arrayHelpers.push('')}
                      >
                        Add Tag
                      </button>
                    )}
                  </div>
                </div>
              )}
            />
            <button
              type='submit'
              className={`text-white bg-indigo-600 ${
                loading && 'bg-indigo-300'
              } focus:outline-none focus:bg-indigo-500 py-1.5 w-full rounded font-semibold mt-2`}
              disabled={isSubmitting}
            >
              {loading ? <Spinner /> : 'Post'}
            </button>
            {success ? (
              <Alert success msg={'Article posted!'} />
            ) : (
              error && <Alert fail msg={error} />
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateArticleScreen;
