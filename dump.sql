--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_userid_fkey";
ALTER TABLE ONLY public."Comment" DROP CONSTRAINT "Comment_userid_fkey";
ALTER TABLE ONLY public."Comment" DROP CONSTRAINT "Comment_postid_fkey";
ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_postid_pkey";
ALTER TABLE ONLY public."Comment" DROP CONSTRAINT "Comment_commentid_pkey";
ALTER TABLE public."User" ALTER COLUMN userid DROP DEFAULT;
ALTER TABLE public."Post" ALTER COLUMN postid DROP DEFAULT;
ALTER TABLE public."Comment" ALTER COLUMN commentid DROP DEFAULT;
DROP SEQUENCE public."User_userid_seq";
DROP TABLE public."User";
DROP SEQUENCE public."Post_postid_seq";
DROP TABLE public."Post";
DROP SEQUENCE public."Comment_commentid_seq";
DROP TABLE public."Comment";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Comment" (
    commentid integer NOT NULL,
    userid integer NOT NULL,
    postid integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "textComment" text
);


--
-- Name: Comment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Comment_commentid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Comment_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Comment_commentid_seq" OWNED BY public."Comment".commentid;


--
-- Name: Post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Post" (
    postid integer NOT NULL,
    text text,
    "postImage" text,
    userid integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: Post_postid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Post_postid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Post_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Post_postid_seq" OWNED BY public."Post".postid;


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    password character varying(150) NOT NULL,
    userid integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: User_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_userid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: User_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_userid_seq" OWNED BY public."User".userid;


--
-- Name: Comment commentid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN commentid SET DEFAULT nextval('public."Comment_commentid_seq"'::regclass);


--
-- Name: Post postid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post" ALTER COLUMN postid SET DEFAULT nextval('public."Post_postid_seq"'::regclass);


--
-- Name: User userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN userid SET DEFAULT nextval('public."User_userid_seq"'::regclass);


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Comment" (commentid, userid, postid, "createdAt", "textComment") FROM stdin;
237	3	229	2020-05-08 18:19:26.54469-07	asdasdasd
238	3	229	2020-05-08 18:19:30.152888-07	dfdfgdfgdfg
239	3	229	2020-05-08 18:19:32.897184-07	asdasdasda
240	3	229	2020-05-08 18:19:36.425697-07	dfgdgdfgd
241	10	228	2020-05-09 10:19:13.38674-07	adasdasdasd
242	10	229	2020-05-09 10:23:14.131651-07	fdfgdfgdfdfgfdfgdfg
243	10	229	2020-05-09 10:23:34.605191-07	QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Post" (postid, text, "postImage", userid, "createdAt") FROM stdin;
228	asdasdaada	\N	3	2020-05-08 18:19:05.112677-07
229		uploads\\1588987158530Muzyar.jpg	3	2020-05-08 18:19:18.556455-07
230	adasdfsfgdfgdfgdfg	\N	10	2020-05-08 19:26:52.864156-07
231	sdfsfasdadefsfsdf	\N	10	2020-05-08 19:27:10.778408-07
233		uploads\\1588991612298Muzyar.jpg	10	2020-05-08 19:33:32.304418-07
234	QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ	uploads\\1588991645689Muzyar.jpg	10	2020-05-08 19:34:05.714134-07
235	I am ready to be deployed	\N	10	2020-05-09 11:38:16.366895-07
237	I am doing great today! Positive vibes! 	\N	10	2020-05-09 18:28:25.106296-07
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (password, userid, name, email, createdat) FROM stdin;
$2b$10$X8qaxPOyIWWGakjG6Ow7weep7MzsplaqJEFN/JsZAVuFI51CSronO	2	sasan	sasan@yahoo.com	2020-03-28 19:08:11.485849
$2b$10$Wp348Pc36nlQk/u9O6LvyecIg5JB.HRTeI09e1zz4mPawqHjK7aP2	3	Tom	Tom@yahoo.com	2020-04-03 12:31:28.303594
$2b$10$31sYlU/VvCo7RXNHmJknYugENCFlRGQQlfsujTZBpoFvIJ/XWLF/.	4	Mark	Mark@yahoo.com	2020-04-03 12:33:32.250317
$2b$10$MMi1ymJ95iBhMBYGL9pao.awuPhyZhEERNy2jxw8yannMB9Av6IHq	9	Mazyar	mazyar@yahoo.com	2020-04-07 16:39:04.961065
$2b$10$5OkJG75KpHCp0lwVlHyDHu3chBD/kQAqWH3YgkpHJylj4XZLurkze	10	Mamad	mamad@yahoo.com	2020-04-18 11:21:14.409751
$2b$10$15tHRv0sLnoZtEgKhhsiseMHvzPUQp.qdK.sMwfIfxM6j3uPyR9Ty	11	Thomas	Thomas@yahoo.com	2020-04-29 19:19:57.710414
$2b$10$zy4sf2qkZAGxZFgBURfq8OizfstNmrJL1C4SnQPm.Vu3bBWtU76xK	12	Zoghi	Ahmad@yahoo.com	2020-05-03 17:46:42.595065
$2b$10$2la7lCWvO9nkwFxpnQHId.sOxCpFat5V7z.pfMr4QbCFiflTC7QnS	13	Kamal	Kamal@yahoo.com	2020-05-03 17:47:19.612618
$2b$10$LLY4485DfWVle8/eHVKT.OyMGBkuj4mgYWfeiqgYZkIJoVDMbzHy2	14	Fred	Fred@yahoo.com	2020-05-06 13:46:31.910325
$2b$10$2k9bZlbaLhsmrnBKqrylyuzn3oyBs2T6mOzLOmOHq8wP6iapKOEXO	15	Sam	Sam@yahoo.com	2020-05-08 18:10:41.099891
\.


--
-- Name: Comment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Comment_commentid_seq"', 244, true);


--
-- Name: Post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Post_postid_seq"', 239, true);


--
-- Name: User_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_userid_seq"', 15, true);


--
-- Name: Comment Comment_commentid_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_commentid_pkey" PRIMARY KEY (commentid);


--
-- Name: Post Post_postid_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_postid_pkey" PRIMARY KEY (postid);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (userid);


--
-- Name: Comment Comment_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postid_fkey" FOREIGN KEY (postid) REFERENCES public."Post"(postid) ON DELETE CASCADE;


--
-- Name: Comment Comment_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userid_fkey" FOREIGN KEY (userid) REFERENCES public."User"(userid);


--
-- Name: Post Post_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_userid_fkey" FOREIGN KEY (userid) REFERENCES public."User"(userid);


--
-- PostgreSQL database dump complete
--

