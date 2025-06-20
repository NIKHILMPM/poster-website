PGDMP     
                    |            posters    15.4    15.4 -    (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    16398    posters    DATABASE     �   CREATE DATABASE posters WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE posters;
                postgres    false            �            1259    24736 	   orderhist    TABLE     �   CREATE TABLE public.orderhist (
    id integer NOT NULL,
    pid integer,
    uid integer,
    oid integer,
    orderstatus character varying(40),
    date date,
    quantity integer,
    price integer
);
    DROP TABLE public.orderhist;
       public         heap    postgres    false            �            1259    24735    orderhist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orderhist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.orderhist_id_seq;
       public          postgres    false    223            ,           0    0    orderhist_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.orderhist_id_seq OWNED BY public.orderhist.id;
          public          postgres    false    222            �            1259    16484    orders    TABLE     �   CREATE TABLE public.orders (
    id integer NOT NULL,
    uid integer NOT NULL,
    pid integer,
    date date,
    status boolean,
    quantity integer NOT NULL,
    approve boolean,
    price integer
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16483    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    221            -           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    220            �            1259    16458    posters    TABLE     �   CREATE TABLE public.posters (
    id integer NOT NULL,
    title character varying(50),
    content text,
    category character varying(50),
    image_src character varying(500),
    quantity integer,
    price integer
);
    DROP TABLE public.posters;
       public         heap    postgres    false            �            1259    16457    posters_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.posters_id_seq;
       public          postgres    false    217            .           0    0    posters_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.posters_id_seq OWNED BY public.posters.id;
          public          postgres    false    216            �            1259    16467    usercart    TABLE     �   CREATE TABLE public.usercart (
    id integer NOT NULL,
    uid integer NOT NULL,
    pid integer,
    quantity integer NOT NULL,
    state boolean,
    price integer
);
    DROP TABLE public.usercart;
       public         heap    postgres    false            �            1259    16466    usercart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usercart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usercart_id_seq;
       public          postgres    false    219            /           0    0    usercart_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usercart_id_seq OWNED BY public.usercart.id;
          public          postgres    false    218            �            1259    16407    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(200) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16406    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            0           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            }           2604    24739    orderhist id    DEFAULT     l   ALTER TABLE ONLY public.orderhist ALTER COLUMN id SET DEFAULT nextval('public.orderhist_id_seq'::regclass);
 ;   ALTER TABLE public.orderhist ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            |           2604    16487 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            z           2604    16461 
   posters id    DEFAULT     h   ALTER TABLE ONLY public.posters ALTER COLUMN id SET DEFAULT nextval('public.posters_id_seq'::regclass);
 9   ALTER TABLE public.posters ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            {           2604    16470    usercart id    DEFAULT     j   ALTER TABLE ONLY public.usercart ALTER COLUMN id SET DEFAULT nextval('public.usercart_id_seq'::regclass);
 :   ALTER TABLE public.usercart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            y           2604    16410    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            %          0    24736 	   orderhist 
   TABLE DATA           Z   COPY public.orderhist (id, pid, uid, oid, orderstatus, date, quantity, price) FROM stdin;
    public          postgres    false    223   �1       #          0    16484    orders 
   TABLE DATA           V   COPY public.orders (id, uid, pid, date, status, quantity, approve, price) FROM stdin;
    public          postgres    false    221   -2                 0    16458    posters 
   TABLE DATA           [   COPY public.posters (id, title, content, category, image_src, quantity, price) FROM stdin;
    public          postgres    false    217   �2       !          0    16467    usercart 
   TABLE DATA           H   COPY public.usercart (id, uid, pid, quantity, state, price) FROM stdin;
    public          postgres    false    219   N=                 0    16407    users 
   TABLE DATA           >   COPY public.users (id, username, email, password) FROM stdin;
    public          postgres    false    215   �=       1           0    0    orderhist_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.orderhist_id_seq', 78, true);
          public          postgres    false    222            2           0    0    orders_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.orders_id_seq', 168, true);
          public          postgres    false    220            3           0    0    posters_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.posters_id_seq', 30, true);
          public          postgres    false    216            4           0    0    usercart_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.usercart_id_seq', 420, true);
          public          postgres    false    218            5           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public          postgres    false    214            �           2606    24741    orderhist orderhist_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orderhist
    ADD CONSTRAINT orderhist_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.orderhist DROP CONSTRAINT orderhist_pkey;
       public            postgres    false    223            �           2606    16489    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    221            �           2606    16465    posters posters_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.posters
    ADD CONSTRAINT posters_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.posters DROP CONSTRAINT posters_pkey;
       public            postgres    false    217            �           2606    16472    usercart usercart_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usercart
    ADD CONSTRAINT usercart_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usercart DROP CONSTRAINT usercart_pkey;
       public            postgres    false    219                       2606    16412    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    24742    orderhist orderhist_pid_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.orderhist
    ADD CONSTRAINT orderhist_pid_fkey FOREIGN KEY (pid) REFERENCES public.posters(id);
 F   ALTER TABLE ONLY public.orderhist DROP CONSTRAINT orderhist_pid_fkey;
       public          postgres    false    3201    217    223            �           2606    24747    orderhist orderhist_uid_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.orderhist
    ADD CONSTRAINT orderhist_uid_fkey FOREIGN KEY (uid) REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.orderhist DROP CONSTRAINT orderhist_uid_fkey;
       public          postgres    false    223    3199    215            �           2606    16495    orders orders_pid_fkey    FK CONSTRAINT     s   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pid_fkey FOREIGN KEY (pid) REFERENCES public.posters(id);
 @   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pid_fkey;
       public          postgres    false    221    217    3201            �           2606    16490    orders orders_uid_fkey    FK CONSTRAINT     q   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_uid_fkey FOREIGN KEY (uid) REFERENCES public.users(id);
 @   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_uid_fkey;
       public          postgres    false    215    3199    221            �           2606    16478    usercart usercart_pid_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.usercart
    ADD CONSTRAINT usercart_pid_fkey FOREIGN KEY (pid) REFERENCES public.posters(id);
 D   ALTER TABLE ONLY public.usercart DROP CONSTRAINT usercart_pid_fkey;
       public          postgres    false    219    3201    217            �           2606    16473    usercart usercart_uid_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.usercart
    ADD CONSTRAINT usercart_uid_fkey FOREIGN KEY (uid) REFERENCES public.users(id);
 D   ALTER TABLE ONLY public.usercart DROP CONSTRAINT usercart_uid_fkey;
       public          postgres    false    3199    215    219            %   �   x�m�1� ���q�T`���t�R���]z��Z�dKȧ��pCFA��>��E*[�e$}�1p�!��|/���'�ǘ��`=�.lń��mE�+DE[V�רZ0ї�o0�	����NIW3i��N�D����B�VM;�      #   R   x�}��	�0г�K��mw�9dj�K�УxH�C��AHl��af��N���_][��z��.W7R�������j��y���6U�         �
  x��Y]Sܸ}v~�*�/���@��^H����V�*Jck�
�5+�3q~�=-���BR�!<V�����i�8��%;�2QZ��(U�$�	#��Si��f�i�P�3���:i,�J�j�ᖁCzdW���
��b�RX�|
kN��2=e&�����/�J�$�USβ�ke���&�vzf�<O�..ήo��8��x��}����|�%��`�jx���2�vwl�^�]�����ވI.��K��;k�4-��v�K�#̵1ڰ�*�� (���/��R��ٹ�$wx^x�r��!{����G<x�~��R���ˬ+�#��ٽ�#���N-$�����(��l��$�E��'�xW��[��� �)2z3́�78�:[">zK�e���.22W&iG�͇y����}�^¬���6��RT�<�]&�N;s���{��,�����2u"-�ciZU"��ڪ�N��v*�T��w�Tu�;vR&�m?p}
}t��O�b>o؋O9�Ӻ�M71e�[�k�2Ѡ���晇��JIY�x)L��%Cm����BN�p�^��"/��c���~�9ɻ��\�t
����[��I���_�D���U�
�Z���G�Ȇ��Ӡ���}j
fլRS.� �w���^��F�w�]ș�2a &NmjD�b��n!��5�,�(,ս�g�����H��{��	����$�?d5i��?�U��7�ʯ�6�ߩR����p�₟m�䘒j8J���i,|.MR��F�v�V�������jTO�Q�`=U�a�sS� ��_ �.��Ԧ%˱�D�D)�Z><���q�Qr��@O�'
k�~��ΐKk�v�F#KU)�ٮ�fH3Y1�ORt�R�@���/�Ӻ`h9Sm[*������7�7����~1�_?�q��7�m�]����ȇ���:0Ԏ��u9��|��m��<0�O0k�y�I�=�o}��Ry8'&ٞS�(CI���[�0_�摊C���1<�`8���M3��u�'(�%h	8n�¨,G_IP;��d���<����߱
���8	E	�W��o}@#B�m�̒�S/M��?�s��W�6���X	!�=��${��4j��'���=�ބTU���tnP(�.z���S,D����w�σs�;8#0�ir���˟@�/)��d}S����g=�IxV4XHㄪZTh5�zL������Mq�$�:L���%�<8}%v�\I�\�4r�}QU�^B��8��@�n�ۛOT������g�@�tu�^��Ah�sX�oA(��� ٍ����[FW��b]�<�o�?@�r=E���z-&�1�jc���;
v��`���$H���"��u�L$�DC�R@� ��#q�Zl����"lL�|�$1J���`x�N'����B�케����Y��� x�b����f��\��D9�I¬pYǃ��ө�)���N]��]�䯄~���6�%�ֲ��8p��1�a�D4l�5<���?�3~<-���|-��|���7[�@�q+�N�������wN�����5M���������<�C��w�!	�[���r�S}=�J�.~
nO�B��ӓ����Ra�k�B� ���|R>�>�F�!����+�ܿ!�|<�����	���E�2�zػ;�+
���h�m��MFC�O9**�L(,����5�������HE�b�ͻ�\�G�`p�?����G�m�*��p0b�zJ����^��-�{'�ċ�\��ټԺP���� �i�%j�gZ}����ڭW���rZ�8������%9�8v�=�{��#��~�]�~$f���yj�.���.��օ��!�&౤ۡ7Ԝ_}�tw���������_�7~�dD-�Mr��̮�ύxKxP"z�S��&Z^��z��$]gЖzE,PrP_�\]��������WM�����������(�X��3EYu�(�r��!Y���O��t�0>��� ��(Tu��@����-"ݨ�0������B��� ���ٖ-�,��Y�i�s�[�('Vꋲ����~p`M`��:��xA ��J��lҰ��\��B��*3c����JW"$Ft�<<��g�����j���mH{�1$@3�%�w�'�4�z�n�;�qr�f����Q#O�s	�,�sɾH̚($��u��{nՑ�3��ѕ�m�k"o� ���O����4�b�0q�Y;���L��0�.�~��ɗ�����ÿ���)����h����WǹNP��i�l!�
A���y�M��e9��	�o�6�{hR6�؃��Kx�36.�q.���Aot�\	���	n}~^�L�����:��oz�ѶۘkW#����O{�	���y�Qn�GPN����y�zc���$��x��wM�g1�������r����?��Ex�Ce�x�MW��o���)�憿��UF� ���|�^ƚ�М�:h&��̔n�1zЗ䮦*��)k��������w�E]���NzE��H�(�!�ƽ�h��@�j�@�cNAp
�� ��<�\U�P��O�oV��,|a��DI=ʶ�]Y�zA�W��oB�E�b[yl*^e^o4����Ƅ,�o�_h-p��Nҟ�㡧��_�U�DYv��T��Q0��,�R���Z5�����R����&Ж{����9�+r��
Ѷ��)�����*���oȦ�*u���뿇�^����e�      !   7   x�310�4�4�4�L�4200�210
��E��B\Ɩ�@# L�4)����� �2�         H   x�3�,�������������-ȵpH�M���K���,H,.�2��!)�Pc�Y��������R�f������� U�%S     