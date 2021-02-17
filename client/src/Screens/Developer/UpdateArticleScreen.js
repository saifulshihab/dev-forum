import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router';
import Alert from '../../Components/Alert';
import MyTextField from '../../Components/MyTextField';
import {
  articleEdit,
  getSingleArticle,
} from '../../redux/action/ArticleAction';
import * as yup from 'yup';
import { ARTICLE_EDIT_RESET } from '../../redux/ActionTypes';

const UpdateArticleScreen = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const fetchSingleArticle = useSelector((state) => state.fetchSingleArticle);
  const { article } = fetchSingleArticle;

  const editArticle = useSelector((state) => state.editArticle);
  const { loading, success, error } = editArticle;

  useEffect(() => {
    dispatch(getSingleArticle(articleId));
    if (success) {
      setTimeout(() => {
        dispatch({
          type: ARTICLE_EDIT_RESET,
        });
      }, 3000);
    }
  }, [dispatch, success, articleId]);

  const formValidationSchema = yup.object().shape({
    title: yup
      .string()
      .min(3, 'Minimum 3 character!')
      .max(100, 'Maximum 100 character!')
      .required('Title Required!'),
    description: yup
      .string()
      .min(50, 'Minimum 50 character!')
      .max(2000, 'Maximum 2000 character!')
      .required('Description Required!'),
  });
  return (
    <div className='bg-white px-3 py-2 rounded shadow'>
      <div>
        <h2 className='font-semibold text-gray-600 text-xl'>
          Write an Article
        </h2>
      </div>
      <Formik
        initialValues={{
          title: article ? article.title : 'Loading...',
          description: article ? article.description : 'Loading...',
        }}
        validationSchema={formValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          dispatch(articleEdit(articleId, data));
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
              className='block mt-2 mb-1 font-semibold text-xs text-gray-600 uppercase'
            >
              Description
            </label>
            <Field name='description'>
              {({ field, meta }) => (
                <div>
                  <Editor
                    id='article_body'
                    apiKey='luwkgwnx411qqfromu0gg9acfvqm2dc21fci2xw1hi9gajok'
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
                    outputFormat='text' /// will be fix later for input rich text
                    {...field}
                  />
                  {meta.touched && meta.error ? (
                    <div className='text-red-500 text-sm'>{meta.error}</div>
                  ) : null}
                </div>
              )}
            </Field>

            <button
              type='submit'
              className={`text-white bg-indigo-600 ${
                loading && 'bg-indigo-300'
              } focus:outline-none focus:bg-indigo-500 py-1.5 w-full rounded font-semibold mt-2`}
              disabled={isSubmitting}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
            {success ? (
              <Alert success msg={'Article Updated!'} />
            ) : (
              error && <Alert fail msg={error} />
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateArticleScreen;
